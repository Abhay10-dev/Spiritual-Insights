import { NextRequest, NextResponse } from 'next/server'
import { apiRateLimiter } from '@/lib/rateLimit'
import dbConnect from '@/lib/mongodb'
import AudioTrack from '@/models/AudioTrack'

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const rateLimitResponse = apiRateLimiter.check(ip)
  
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  try {
    await dbConnect()
    const tracks = await AudioTrack.find({}).lean()
    
    return NextResponse.json({ 
      tracks: tracks.map((t: any) => ({ ...t, id: t._id.toString() })) 
    })
  } catch (error) {
    console.error('Error fetching audio_library from MongoDB:', error)
    return NextResponse.json({ error: 'Failed to fetch audio library', tracks: [] }, { status: 500 })
  }
}
