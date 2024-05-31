import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const pump = promisify(pipeline);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file'); // Assuming the input field name is 'file'

    // Get the current directory
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const uploadDir = path.join(__dirname, '../../../public/uploads'); // Adjust the path accordingly
    const filePath = path.join(uploadDir, file.name);

    console.log(uploadDir);

    // Create the upload directory if it doesn't exist
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
