'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { sendContactEmail, type ContactFormData } from '@/app/actions/contact'

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const result = await sendContactEmail(formData)

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.',
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-expanova-error">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-expanova-error">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject (Optional)</Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-expanova-error">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us what's on your mind..."
          disabled={isSubmitting}
          rows={6}
        />
      </div>

      {submitStatus.type && (
        <div
          className={`rounded-lg border p-4 ${
            submitStatus.type === 'success'
              ? 'border-expanova-success/50 bg-expanova-success/10 text-expanova-success'
              : 'border-expanova-error/50 bg-expanova-error/10 text-expanova-error'
          }`}
        >
          <p className="text-sm font-medium">{submitStatus.message}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}

