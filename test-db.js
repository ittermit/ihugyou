const { Client } = require('pg');

const variations = [
    {
        name: "Direct (IPv6 potentially)",
        url: "postgresql://postgres:thDEc0SgCtCWvNXc@db.ckcmhgnxjkcdjhyeosgf.supabase.co:5432/postgres"
    },
    {
        name: "Pooled (Port 6543, No Ref)",
        url: "postgresql://postgres:thDEc0SgCtCWvNXc@db.ckcmhgnxjkcdjhyeosgf.supabase.co:6543/postgres"
    },
    {
        name: "Pooled (Port 6543, With Ref)",
        url: "postgresql://postgres.ckcmhgnxjkcdjhyeosgf:thDEc0SgCtCWvNXc@db.ckcmhgnxjkcdjhyeosgf.supabase.co:6543/postgres"
    },
    {
        name: "Pooler Host (Port 5432, With Ref)",
        url: "postgresql://postgres.ckcmhgnxjkcdjhyeosgf:thDEc0SgCtCWvNXc@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"
    }
];

async function testAll() {
    for (const v of variations) {
        console.log(`\nTesting: ${v.name}...`);
        const client = new Client({ connectionString: v.url, connectionTimeoutMillis: 5000 });
        try {
            await client.connect();
            console.log("✅ Success!");
            await client.end();
        } catch (err) {
            console.log(`❌ Error: ${err.message}`);
        }
    }
}

testAll();
