import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

export class CreateSuperUser1709664000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if super admin role exists
        const existingRole = await queryRunner.query(`
            SELECT id FROM app_roles WHERE name = 'Super Admin'
        `);

        let superAdminRoleId;
        if (existingRole.length === 0) {
            // Create super admin role if it doesn't exist
            const [newRole] = await queryRunner.query(`
                INSERT INTO app_roles (name, description, created_at, updated_at)
                VALUES ('Super Admin', 'Super Admin role with all permissions', NOW(), NOW())
                RETURNING id
            `);
            superAdminRoleId = newRole.id;
        } else {
            superAdminRoleId = existingRole[0].id;
        }

        // Check if super user exists by username or email
        const existingUser = await queryRunner.query(`
            SELECT id FROM app_users 
            WHERE username = 'tutorsplan' OR email = 'admin@tutorsplan.com'
        `);

        let superUserId;
        if (existingUser.length === 0) {
            // Create super user if it doesn't exist
            const passwordHash = await bcrypt.hash('tutorsplan@2025', 10);
            const [newUser] = await queryRunner.query(`
                INSERT INTO app_users (
                    username, 
                    password_hash, 
                    first_name, 
                    last_name, 
                    email, 
                    is_super_admin,
                    active_or_archive,
                    email_confirmed,
                    created_at, 
                    updated_at
                )
                VALUES (
                    'tutorsplan',
                    $1,
                    'TutorsPlan',
                    'Admin',
                    'admin@tutorsplan.com',
                    true,
                    true,
                    true,
                    NOW(),
                    NOW()
                )
                RETURNING id
            `, [passwordHash]);
            superUserId = newUser.id;
        } else {
            superUserId = existingUser[0].id;
            // Update existing user's super admin status
            await queryRunner.query(`
                UPDATE app_users 
                SET is_super_admin = true,
                    active_or_archive = true,
                    email_confirmed = true,
                    updated_at = NOW()
                WHERE id = $1
            `, [superUserId]);
        }

        // Check if user-role relationship exists
        const existingUserRole = await queryRunner.query(`
            SELECT id FROM app_user_roles 
            WHERE user_id = $1 AND role_id = $2
        `, [superUserId, superAdminRoleId]);

        if (existingUserRole.length === 0) {
            // Create user-role relationship if it doesn't exist
            await queryRunner.query(`
                INSERT INTO app_user_roles (
                    user_id, 
                    role_id, 
                    assigned_date,
                    created_at, 
                    updated_at
                )
                VALUES ($1, $2, NOW(), NOW(), NOW())
            `, [superUserId, superAdminRoleId]);
        }

        // Set primary role
        await queryRunner.query(`
            UPDATE app_users 
            SET primary_role_id = $1,
                updated_at = NOW()
            WHERE id = $2
        `, [superAdminRoleId, superUserId]);

        // Get all permissions from app_permissions table
        const permissions = await queryRunner.query(`
            SELECT id FROM app_permissions
        `);

        // Remove existing role permissions
        await queryRunner.query(`
            DELETE FROM app_role_permissions 
            WHERE role_id = $1
        `, [superAdminRoleId]);

        // Assign all permissions to super admin role
        for (const permission of permissions) {
            await queryRunner.query(`
                INSERT INTO app_role_permissions (role_id, permission_id, created_at, updated_at)
                VALUES ($1, $2, NOW(), NOW())
            `, [superAdminRoleId, permission.id]);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove super user role assignments
        await queryRunner.query(`
            DELETE FROM app_user_roles 
            WHERE user_id IN (SELECT id FROM app_users WHERE username = 'tutorsplan')
        `);

        // Remove super user
        await queryRunner.query(`
            DELETE FROM app_users 
            WHERE username = 'tutorsplan'
        `);

        // Remove super admin role permissions
        await queryRunner.query(`
            DELETE FROM app_role_permissions 
            WHERE role_id IN (SELECT id FROM app_roles WHERE name = 'Super Admin')
        `);

        // Remove super admin role
        await queryRunner.query(`
            DELETE FROM app_roles 
            WHERE name = 'Super Admin'
        `);
    }
} 