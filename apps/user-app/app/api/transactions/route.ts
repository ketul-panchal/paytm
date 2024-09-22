// apps/user-app/app/api/transactions/route.ts

import { NextResponse } from 'next/server';
import prisma from '@repo/db/client';
export async function GET() {
  try {
    // Fetch P2P transactions from the database
    const p2pTransfers = await prisma.p2pTransfer.findMany({
      include: {
        fromUser: true,
        toUser: true,
      },
    });

    return NextResponse.json({ p2pTransfers });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ message: 'Error fetching transactions' }, { status: 500 });
  }
}
