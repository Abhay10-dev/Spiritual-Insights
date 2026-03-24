import { NextRequest, NextResponse } from 'next/server'
import { apiRateLimiter } from '@/lib/rateLimit'
import dbConnect from '@/lib/mongodb'
import VideoTrack from '@/models/VideoTrack'

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const rateLimitResponse = apiRateLimiter.check(ip)
  
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  try {
    await dbConnect()
    const videos = await VideoTrack.find({}).lean()
    
    return NextResponse.json({ 
      videos: videos.map((v: any) => ({ ...v, id: v._id.toString() })) 
    })
  } catch (error) {
    console.error('Error fetching video_library from MongoDB:', error)
    return NextResponse.json({ error: 'Failed to fetch video library', videos: [] }, { status: 500 })
  }
}
