"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: ""
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from("contacts")
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          service: formData.service,
          message: formData.message
        }])

      if (error) throw error

      setStatus("success")
      setFormData({ name: "", email: "", company: "", service: "", message: "" })
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {"Let's Build Something Great"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Ready to elevate your trading infrastructure or bring your software vision to life? 
            Get in touch and let us discuss how we can help.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="flex flex-col gap-4">
            <Card className="bg-card border-border">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground mb-1">Email Us</h3>
                  <p className="text-sm text-muted-foreground">contact@archaeopteris.us</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">Remote-first, Global Operations</p>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mt-auto">
              <h3 className="font-semibold text-foreground mb-2">Quick Response</h3>
              <p className="text-sm text-muted-foreground">
                We typically respond within 24 hours on business days. For urgent inquiries, 
                please mention it in your message.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardContent className="p-8">
              {status === "success" ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We will get back to you shortly.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setStatus("idle")}
                    className="border-border text-foreground hover:bg-secondary"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name" className="text-foreground">Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email" className="text-foreground">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="company" className="text-foreground">Company</Label>
                      <Input
                        id="company"
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="service" className="text-foreground">Service Interest *</Label>
                      <Select 
                        value={formData.service} 
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                        required
                      >
                        <SelectTrigger className="bg-input border-border text-foreground">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trading">Trading Solutions</SelectItem>
                          <SelectItem value="development">Full-Stack Development</SelectItem>
                          <SelectItem value="both">Both Divisions</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="message" className="text-foreground">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      <span className="text-sm text-destructive">{errorMessage}</span>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={status === "loading"}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto md:self-end"
                  >
                    {status === "loading" ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
