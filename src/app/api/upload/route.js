import { NextResponse } from 'next/server';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pump = promisify(pipeline);



export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file'); 
    const filePath = `./public/uploads/${file.name}`;


    const uploadDir = './public/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await pump(file.stream(), fs.createWriteStream(filePath));

    const publicPath = `/uploads/${file.name}`;
    return NextResponse.json({ status: "success", data: publicPath });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", data: e.message });
  }
}
