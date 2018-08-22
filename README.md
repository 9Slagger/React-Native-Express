ติดตั้ง

1.เปิด terminal แล้ว cd เข้ามาที่ project

2.ใช้คำสั่ง npm install && cd server && npm install --save express mysql bcryptjs jsonwebtoken axios && cd ..

เปิดใช้งาน

1.เปิด terminal เปิด mongodb ด้วยคำสั่ง mongod ***ต้องสร้าง db ชื่อ shopper และ collection users ใน mongodb ไว้แล้ว

2.เปิด terminal หน้าต่างใหม่พิม node server/server.js

3.เปิด terminal หน้าต่างใหม่พิม react-native run-ios หรือ react-native run-android ***กรณี android ต้องเปิด simulator ไว้ก่อน