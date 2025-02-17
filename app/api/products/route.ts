import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:9000/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const response = await fetch(`${API_URL}/products?${searchParams.toString()}`);
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}