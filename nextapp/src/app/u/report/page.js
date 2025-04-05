
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, MapPin, Upload, Plus, X, AlertTriangle, Loader } from 'lucide-react'
import { toast } from 'sonner'
import { auth } from '@/lib/firebase'
import { uploadToIPFS } from '@/lib/ipfs'
import { submitReport } from '@/lib/web3'

export default function ReportPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('other')
  const [location, setLocation] = useState(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [urgencyLevel, setUrgencyLevel] = useState(3)
  const [witnesses, setWitnesses] = useState([])
  const [newWitness, setNewWitness] = useState('')
  const [evidence, setEvidence] = useState([])
  const [newEvidenceType, setNewEvidenceType] = useState('image')
  const [newEvidenceDescription, setNewEvidenceDescription] = useState('')
  
  const router = useRouter()
  
  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser')
      setIsLoadingLocation(false)
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: 'Your current location'
        }
        
        setLocation(newLocation)
        toast.success('Location detected', {
          description: 'Your current location will be included in the report.'
        })
        setIsLoadingLocation(false)
      },
      (error) => {
        console.error('Error getting location', error)
        toast.error('Failed to get your location', {
          description: 'Please try again or enter location manually.'
        })
        setIsLoadingLocation(false)
      }
    )
  }

  const addWitness = () => {
    if (!newWitness.trim()) return
    
    setWitnesses([...witnesses, { 
      id: `witness-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
      description: newWitness 
    }])
    setNewWitness('')
    
    toast.success('Witness added', {
      description: 'Witness information has been added to your report.'
    })
  }

  const removeWitness = (index) => {
    setWitnesses(witnesses.filter((_, i) => i !== index))
  }

  const addEvidence = () => {
    if (!newEvidenceDescription.trim()) return
    
    setEvidence([...evidence, { 
      type: newEvidenceType, 
      description: newEvidenceDescription,
      timestamp: new Date().toISOString() 
    }])
    
    setNewEvidenceDescription('')
    
    toast.success('Evidence added', {
      description: 'Evidence has been added to your report.'
    })
  }

  const removeEvidence = (index) => {
    setEvidence(evidence.filter((_, i) => i !== index))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title || !description || !location) {
      toast.error('Please fill all required fields', {
        description: 'Title, description and location are required.'
      })
      return
    }
    
    if (!auth.currentUser) {
      toast.error('You must be logged in to submit a report')
      router.push('/auth')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Upload report data to IPFS
      const reportData = {
        title,
        description,
        category,
        location,
        witnesses: witnesses.length > 0 ? witnesses : [],
        evidence: evidence.map(e => ({
          ...e,
          timestamp: new Date().toISOString()
        })),
        urgencyLevel,
        timestamp: new Date().toISOString()
      }
      
      // Upload title and description to IPFS
      const titleResult = await uploadToIPFS({ title })
      const descriptionResult = await uploadToIPFS({ description })
      
      // Upload witnesses and evidence to IPFS if they exist
      const witnessesResult = witnesses.length > 0 
        ? await uploadToIPFS({ witnesses }) 
        : { success: true, cid: '' }
      
      const evidenceResult = evidence.length > 0 
        ? await uploadToIPFS({ evidence }) 
        : { success: true, cid: '' }
      
      // Upload location to IPFS
      const locationResult = await uploadToIPFS({ location })
      
      // Upload full details to IPFS
      const detailsResult = await uploadToIPFS(reportData)
      
      if (!titleResult.success || !descriptionResult.success || 
          !witnessesResult.success || !evidenceResult.success || 
          !locationResult.success || !detailsResult.success) {
        throw new Error('Failed to upload data to IPFS')
      }
      
      // Map category string to number
      const categoryMap = {
        'theft': 0,
        'assault': 1,
        'vandalism': 2,
        'fraud': 3,
        'harassment': 4,
        'other': 5
      }
      
      // Submit report to blockchain
      const result = await submitReport({
        titleHash: titleResult.cid,
        descriptionHash: descriptionResult.cid,
        category: categoryMap[category] || 5,
        latitude: location.latitude,
        longitude: location.longitude,
        locationHash: locationResult.cid,
        witnessesHash: witnessesResult.cid,
        evidenceHash: evidenceResult.cid,
        detailsHash: detailsResult.cid,
        urgencyLevel,
        districtId: 'general'
      }, auth.currentUser.phoneNumber)
      
      if (result.success) {
        toast.success('Report submitted successfully', {
          description: 'Your report has been recorded on the blockchain.'
        })
        
        // Reset form
        setTitle('')
        setDescription('')
        setCategory('other')
        setLocation(null)
        setUrgencyLevel(3)
        setWitnesses([])
        setEvidence([])
        
        // Redirect to my reports
        router.push('/u/my-reports')
      } else {
        throw new Error(result.error || 'Failed to submit report to blockchain')
      }
    } catch (error) {
      console.error('Error submitting report', error)
      toast.error('Failed to submit report', {
        description: error.message || 'Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-civic-primary to-civic-secondary p-6 text-white">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Submit Crime Report</h1>
          </div>
          <p className="opacity-90 mt-1">
            Submit your report securely and anonymously
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Incident Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Brief title describing the incident"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-civic-primary focus:border-transparent"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Crime Category
            </label>
            <select 
              id="category"
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-civic-primary focus:border-transparent"
            >
              <option value="theft">Theft</option>
              <option value="assault">Assault</option>
              <option value="vandalism">Vandalism</option>
              <option value="fraud">Fraud</option>
              <option value="harassment">Harassment</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Provide detailed information about what happened"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-civic-primary focus:border-transparent"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={getCurrentLocation}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={isLoadingLocation}
              >
                {isLoadingLocation ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                {location ? "Update Location" : "Use Current Location"}
              </button>
              
              {location && (
                <span className="text-sm text-gray-500">
                  {location.address || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Urgency Level</label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setUrgencyLevel(level)}
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    urgencyLevel === level 
                      ? level <= 2 
                        ? "bg-green-500 text-white" 
                        : level >= 4 
                          ? "bg-red-500 text-white" 
                          : "bg-yellow-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              {urgencyLevel <= 2 
                ? "Low urgency - For minor incidents or those that occurred some time ago" 
                : urgencyLevel >= 4 
                  ? "High urgency - For serious incidents requiring immediate attention" 
                  : "Medium urgency - For standard incidents requiring normal processing"}
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Witnesses (Optional)</label>
            <div className="flex gap-2">
              <input
                placeholder="Brief description of witness"
                value={newWitness}
                onChange={(e) => setNewWitness(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-civic-primary focus:border-transparent"
              />
              <button 
                type="button" 
                onClick={addWitness}
                disabled={!newWitness.trim()}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            {witnesses.length > 0 && (
              <div className="mt-2 space-y-2">
                {witnesses.map((witness, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <span className="text-sm text-gray-700 truncate">{witness.description}</span>
                    <button
                      type="button"
                      onClick={() => removeWitness(index)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Evidence (Optional)</label>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1">
                  <select 
                    value={newEvidenceType} 
                    onChange={(e) => setNewEvidenceType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                    <option value="audio">Audio</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <input
                    placeholder="Description of evidence"
                    value={newEvidenceDescription}
                    onChange={(e) => setNewEvidenceDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-civic-primary focus:border-transparent"
                  />
                </div>
                <div className="col-span-1">
                  <button 
                    type="button" 
                    onClick={addEvidence}
                    disabled={!newEvidenceDescription.trim()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center gap-1"
                  >
                    <Upload className="h-4 w-4" />
                    Add
                  </button>
                </div>
              </div>
              
              <p className="text-xs text-gray-500">
                Note: In the full version, you would be able to upload actual files. 
                For this demo, we're just collecting descriptions.
              </p>
            </div>
            
            {evidence.length > 0 && (
              <div className="mt-2 space-y-2">
                {evidence.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white px-2 py-0.5 rounded bg-civic-primary">
                        {item.type.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-700 truncate">{item.description}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeEvidence(index)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-civic-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600">
              Your identity is protected. Report details will be stored securely on the blockchain, and personal information will not be publicly visible.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <button
              type="submit"
              className="w-full bg-civic-primary hover:bg-civic-dark text-white py-3 rounded-md font-medium transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Submitting Report
                </>
              ) : (
                "Submit Report"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
