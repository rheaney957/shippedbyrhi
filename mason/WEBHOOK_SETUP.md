# Sanity Webhook Configuration

## What is a Webhook?

A webhook automatically tells your Next.js website when content changes in Sanity, so it can update immediately without manual intervention.

## Setup Steps

### 1. Get Your Webhook URL

Your webhook URL will be:
- **Local development**: Not needed (refresh browser manually)
- **Production**: `https://your-domain.com/api/revalidate`

Replace `your-domain.com` with your actual deployed website URL.

### 2. Get Your Secret Key

Your secret key is in the `.env.local` file:
```
SANITY_REVALIDATE_SECRET=your-secret-here
```

Copy this exact value (everything after the `=` sign).

### 3. Configure Webhook in Sanity

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project: **Mason** (ID: jarqkhyz)
3. Click **API** in the left sidebar
4. Click **Webhooks**
5. Click **Create webhook** button

### 4. Webhook Settings

Fill in the form:

**Name**: `Next.js Production Revalidation`

**URL**: `https://your-domain.com/api/revalidate`
(Replace with your actual production URL)

**Dataset**: `production`

**Trigger on**:
- ☑ Create
- ☑ Update
- ☑ Delete

**Projection**: Leave empty (use default)

**HTTP method**: `POST`

**HTTP Headers**: Leave empty

**Secret**: Paste your `SANITY_REVALIDATE_SECRET` value here

**API version**: `v2021-03-25` (or latest)

**Include drafts**: ☐ Unchecked

### 5. Save and Test

1. Click **Save**
2. The webhook will appear in your webhooks list
3. Make a small change in Sanity Studio and publish it
4. Check your website - it should update within 30 seconds!

## Troubleshooting

### Webhook not triggering?

1. **Check the webhook logs**:
   - In Sanity Manage → API → Webhooks
   - Click on your webhook
   - View the delivery history
   - Look for errors

2. **Common issues**:
   - Wrong URL (must be https://)
   - Wrong secret (must match .env.local exactly)
   - Website not deployed yet
   - Firewall blocking the webhook

### How to test the webhook manually

You can test your webhook using curl:

```bash
curl -X POST https://your-domain.com/api/revalidate \\
  -H "Content-Type: application/json" \\
  -d '{"_type":"service"}'
```

You should get a response like:
```json
{
  "status": 200,
  "revalidated": true,
  "now": 1234567890
}
```

### Webhook Security

The secret key ensures that only Sanity can trigger revalidation. Keep it private!

- ✅ Add it to your deployment environment variables
- ✅ Use the same value in Sanity webhook settings
- ❌ Don't commit it to git
- ❌ Don't share it publicly

## Development vs Production

### Development (localhost)
- No webhook needed
- Manually refresh browser after publishing changes
- Faster for testing

### Production (deployed site)
- Webhook required for automatic updates
- Changes appear within 30 seconds
- Better for client use

## Multiple Environments

If you have staging and production:

Create two webhooks:

**Staging**:
- URL: `https://staging.your-domain.com/api/revalidate`
- Dataset: `production` or `staging`
- Secret: Same as production

**Production**:
- URL: `https://your-domain.com/api/revalidate`
- Dataset: `production`
- Secret: From .env.local

## Monitoring

Check webhook health:
1. Go to Sanity Manage
2. API → Webhooks
3. Click your webhook
4. View delivery history
5. Check success rate

Healthy webhook shows:
- ✅ 200 status codes
- ✅ Consistent delivery times
- ✅ No errors

## Need Help?

If webhooks aren't working:
1. Check the logs in Sanity
2. Verify your secret key matches
3. Ensure your site is deployed
4. Test the endpoint manually
5. Contact your developer

---

**Remember**: You only need to set this up once per environment!
