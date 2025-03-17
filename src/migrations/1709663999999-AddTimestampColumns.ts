import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimestampColumns1709663999999 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add timestamp columns to app_roles
        await queryRunner.query(`
            ALTER TABLE app_roles 
            ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW(),
            ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW()
        `);

        // Add timestamp columns to app_users
        await queryRunner.query(`
            ALTER TABLE app_users 
            ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW(),
            ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW()
        `);

        // Add timestamp columns to app_user_roles
        await queryRunner.query(`
            ALTER TABLE app_user_roles 
            ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW(),
            ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW()
        `);

        // Add timestamp columns to app_role_permissions
        await queryRunner.query(`
            ALTER TABLE app_role_permissions 
            ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW(),
            ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove timestamp columns from app_roles
        await queryRunner.query(`
            ALTER TABLE app_roles 
            DROP COLUMN IF EXISTS created_at,
            DROP COLUMN IF EXISTS updated_at
        `);

        // Remove timestamp columns from app_users
        await queryRunner.query(`
            ALTER TABLE app_users 
            DROP COLUMN IF EXISTS created_at,
            DROP COLUMN IF EXISTS updated_at
        `);

        // Remove timestamp columns from app_user_roles
        await queryRunner.query(`
            ALTER TABLE app_user_roles 
            DROP COLUMN IF EXISTS created_at,
            DROP COLUMN IF EXISTS updated_at
        `);

        // Remove timestamp columns from app_role_permissions
        await queryRunner.query(`
            ALTER TABLE app_role_permissions 
            DROP COLUMN IF EXISTS created_at,
            DROP COLUMN IF EXISTS updated_at
        `);
    }
} 