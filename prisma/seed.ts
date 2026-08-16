import { PrismaClient } from '@prisma/client';
import { calculateWaterQuality } from '../src/lib/water-quality';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.record.deleteMany();
  await prisma.area.deleteMany();
  await prisma.upload.deleteMany();
  await prisma.apiKey.deleteMany();
  await prisma.user.deleteMany();

  // Create sample users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@waterspot.com',
      name: 'Admin User',
      role: 'admin',
    },
  });

  const analystUser = await prisma.user.create({
    data: {
      email: 'analyst@waterspot.com',
      name: 'Analyst User',
      role: 'analyst',
    },
  });

  const viewerUser = await prisma.user.create({
    data: {
      email: 'viewer@waterspot.com',
      name: 'Viewer User',
      role: 'viewer',
    },
  });

  console.log('✅ Created sample users');

  // Create sample areas
  const areas = [
    {
      name: 'Downtown Water Station',
      latitude: 40.7128,
      longitude: -74.0060,
    },
    {
      name: 'Riverside Treatment Plant',
      latitude: 40.7580,
      longitude: -73.9855,
    },
    {
      name: 'Industrial Zone Monitoring',
      latitude: 40.7489,
      longitude: -73.9680,
    },
    {
      name: 'Suburban North Facility',
      latitude: 40.7831,
      longitude: -73.9712,
    },
    {
      name: 'Lakeside Water Quality Point',
      latitude: 40.7794,
      longitude: -73.9632,
    },
    {
      name: 'Central Park Reservoir',
      latitude: 40.7829,
      longitude: -73.9654,
    },
    {
      name: 'Brooklyn Heights Station',
      latitude: 40.6961,
      longitude: -73.9969,
    },
    {
      name: 'Queens Monitoring Point',
      latitude: 40.7282,
      longitude: -73.7949,
    },
  ];

  const createdAreas = await Promise.all(
    areas.map(area => prisma.area.create({ data: area }))
  );

  console.log('✅ Created sample areas');

  // Create sample water quality records
  const sampleRecords = [];
  
  // Generate records for each area over the past 30 days
  for (const area of createdAreas) {
    for (let day = 0; day < 30; day++) {
      const date = new Date();
      date.setDate(date.getDate() - day);
      
      // Generate realistic water quality data with some variation
      const baseValues = {
        ph: 7.0 + (Math.random() - 0.5) * 1.0,
        hardness: 150 + (Math.random() - 0.5) * 100,
        tds: 200 + (Math.random() - 0.5) * 150,
        turbidity: 2.0 + (Math.random() - 0.5) * 2,
        alkalinity: 100 + (Math.random() - 0.5) * 80,
        nitrate: 10 + (Math.random() - 0.5) * 15,
        fluoride: 0.7 + (Math.random() - 0.5) * 0.6,
        chloride: 50 + (Math.random() - 0.5) * 100,
        conductivity: 500 + (Math.random() - 0.5) * 400,
        temperature: 20 + (Math.random() - 0.5) * 10,
      };

      // Calculate WQI
      const wqiResult = calculateWaterQuality(baseValues);

      sampleRecords.push({
        areaId: area.id,
        userId: analystUser.id,
        date: date,
        ph: baseValues.ph,
        hardness: baseValues.hardness,
        tds: baseValues.tds,
        turbidity: baseValues.turbidity,
        alkalinity: baseValues.alkalinity,
        nitrate: baseValues.nitrate,
        fluoride: baseValues.fluoride,
        chloride: baseValues.chloride,
        conductivity: baseValues.conductivity,
        temperature: baseValues.temperature,
        wqi: wqiResult.wqi,
        label: wqiResult.label,
        confidence: wqiResult.confidence,
        source: 'manual',
      });
    }
  }

  // Create records in batches
  const batchSize = 50;
  for (let i = 0; i < sampleRecords.length; i += batchSize) {
    const batch = sampleRecords.slice(i, i + batchSize);
    await prisma.record.createMany({ data: batch });
  }

  console.log(`✅ Created ${sampleRecords.length} sample water quality records`);

  // Create sample uploads
  const uploads = [
    {
      filename: 'january_2024_monitoring.csv',
      status: 'done',
      rowsTotal: 150,
      rowsOk: 145,
      rowsFailed: 5,
      createdBy: analystUser.id,
    },
    {
      filename: 'riverside_analysis.xlsx',
      status: 'done',
      rowsTotal: 89,
      rowsOk: 89,
      rowsFailed: 0,
      createdBy: adminUser.id,
    },
    {
      filename: 'industrial_zone_data.csv',
      status: 'processing',
      rowsTotal: 200,
      rowsOk: 0,
      rowsFailed: 0,
      createdBy: analystUser.id,
    },
  ];

  await Promise.all(
    uploads.map(upload => prisma.upload.create({ data: upload }))
  );

  console.log('✅ Created sample uploads');

  // Create sample API keys
  const apiKeys = [
    {
      name: 'Production API Key',
      keyHash: 'prod_hash_placeholder',
      role: 'admin',
    },
    {
      name: 'Analytics API Key',
      keyHash: 'analytics_hash_placeholder',
      role: 'analyst',
    },
    {
      name: 'Read-only API Key',
      keyHash: 'readonly_hash_placeholder',
      role: 'viewer',
    },
  ];

  await Promise.all(
    apiKeys.map(key => prisma.apiKey.create({ data: key }))
  );

  console.log('✅ Created sample API keys');

  // Print summary
  const totalRecords = await prisma.record.count();
  const totalAreas = await prisma.area.count();
  const totalUsers = await prisma.user.count();
  const totalUploads = await prisma.upload.count();

  console.log('\n📊 Database Summary:');
  console.log(`   Users: ${totalUsers}`);
  console.log(`   Areas: ${totalAreas}`);
  console.log(`   Records: ${totalRecords}`);
  console.log(`   Uploads: ${totalUploads}`);
  console.log('\n🎉 Database seed completed successfully!');
  
  // Print login credentials
  console.log('\n🔐 Sample Login Credentials:');
  console.log('   Admin: admin@waterspot.com');
  console.log('   Analyst: analyst@waterspot.com');
  console.log('   Viewer: viewer@waterspot.com');
  console.log('   (No password required for demo)');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });