import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { NextResponse } from 'next/server';

const writeFile = promisify(fs.writeFile);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !file.stream) {
      throw new Error('File is not valid');
    }

    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    const fileBuffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(fileBuffer));

  
    const fileData = fs.readFileSync(filePath,{encoding: 'base64'});
    return NextResponse.json({status:200,data:fileData});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: 'fail', data: e.message });
  }
}
