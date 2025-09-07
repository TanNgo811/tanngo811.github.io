import { createServerSupabaseClient } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await request.json()

    // Create user in Supabase Auth
    const supabase = await createServerSupabaseClient()
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 400 })
    }

    // Save additional user data to the database
    try {
      await prisma.public_users.create({
        data: {
          id: authData.user.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
        },
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      // If database save fails, we should still return success for auth
      // The user can still log in, but profile data might be missing
    }

    return NextResponse.json({
      user: authData.user,
      session: authData.session,
      message: 'User created successfully'
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
