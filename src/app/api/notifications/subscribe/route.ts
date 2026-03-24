import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(req: NextRequest) {
  const session = await getServerSession()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { token } = await req.json() as { token?: string }
  if (!token || typeof token !== 'string') {
    return NextResponse.json({ error: 'Missing FCM token' }, { status: 400 })
  }

  const email = session.user.email
  if (!email) {
    return NextResponse.json({ error: 'User email missing from session' }, { status: 400 })
  }

  try {
    await dbConnect()
    await User.findOneAndUpdate(
      { email },
      { fcmToken: token, fcmUpdatedAt: new Date() },
      { upsert: true }
    )
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[FCM subscribe MongoDB]', err)
    return NextResponse.json({ error: 'Failed to save token' }, { status: 500 })
  }
}
