import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import JapSession from '@/models/JapSession'
import { apiRateLimiter } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
    const rateLimitResponse = apiRateLimiter.check(ip)
    
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const body = await req.json()
    const { userId, mantraName, count, completedMalas } = body

    if (!userId || !mantraName || count === undefined) {
      return NextResponse.json({ error: 'userId, mantraName, and count are required' }, { status: 400 })
    }

    await dbConnect()
    const newSession = await JapSession.create({
      userId,
      mantraName,
      count,
      completedMalas: completedMalas ?? 0,
    })

    return NextResponse.json({ id: newSession._id.toString(), success: true })
  } catch (err) {
    console.error('[/api/jap-mala/session POST] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId query parameter is required' }, { status: 400 })
    }

    await dbConnect()
    const sessions = await JapSession.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean()

    const formattedSessions = sessions.map((d: any) => ({
      id: d._id.toString(),
      ...d,
      _id: undefined,
      __v: undefined,
    }))

    return NextResponse.json({ sessions: formattedSessions })
  } catch (err) {
    console.error('[/api/jap-mala/session GET] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
