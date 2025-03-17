import { registerAs } from '@nestjs/config';

export default registerAs('webhook', () => ({
  zapier: {
    contacts: {
      outbound: {
        url: process.env.ZAPIER_CONTACT_WEBHOOK_URL,
        secret: process.env.ZAPIER_CONTACT_WEBHOOK_SECRET,
      },
    },
    campaigns: {
      outbound: {
        url: process.env.ZAPIER_CAMPAIGN_WEBHOOK_URL,
        secret: process.env.ZAPIER_CAMPAIGN_WEBHOOK_SECRET,
      },
    },
  },
  security: {
    validateUserAgent: process.env.WEBHOOK_VALIDATE_USER_AGENT === 'true',
    allowedUserAgents: (
      process.env.WEBHOOK_ALLOWED_USER_AGENTS || 'zapier'
    ).split(','),
  },
}));
