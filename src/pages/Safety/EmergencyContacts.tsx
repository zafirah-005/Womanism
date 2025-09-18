import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Phone, MessageSquare, Users } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { BackButton } from '../../components/BackButton';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  email?: string;
}

export const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string>('');
  const [formData, setFormData] = useState<Omit<EmergencyContact, 'id'>>({
    name: '',
    phone: '',
    relationship: '',
    email: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('emergencyContacts');
    if (saved) {
      setContacts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSave = () => {
    if (!formData.name.trim() || !formData.phone.trim()) return;

    if (editingId) {
      setContacts(prev => prev.map(contact => 
        contact.id === editingId ? { ...formData, id: editingId } : contact
      ));
    } else {
      const newContact = {
        ...formData,
        id: Date.now().toString()
      };
      setContacts(prev => [...prev, newContact]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', relationship: '', email: '' });
    setIsAdding(false);
    setEditingId('');
  };

  const editContact = (contact: EmergencyContact) => {
    setFormData(contact);
    setEditingId(contact.id);
    setIsAdding(true);
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  const relationships = ['Family', 'Friend', 'Partner', 'Colleague', 'Neighbor', 'Other'];

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <BackButton to="/safety" />
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Emergency Contacts
          </h1>
          <p className="text-lg text-purple-700/80 max-w-2xl mx-auto">
            Manage your trusted contacts for emergency situations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <GlassCard className="p-6" hover={false}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-purple-800">
                {isAdding ? (editingId ? 'Edit Contact' : 'Add New Contact') : 'Emergency Contacts'}
              </h3>
              {!isAdding && (
                <button
                  onClick={() => setIsAdding(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Contact</span>
                </button>
              )}
            </div>

            {isAdding ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-purple-700 font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Contact name"
                    className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-purple-800 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-purple-700 font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                    className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-purple-800 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-purple-700 font-medium mb-2">Relationship</label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select relationship</option>
                    {relationships.map(rel => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-purple-700 font-medium mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="contact@example.com"
                    className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-purple-800 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    disabled={!formData.name.trim() || !formData.phone.trim()}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editingId ? 'Update Contact' : 'Save Contact'}
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 bg-white/20 text-purple-700 font-semibold rounded-xl hover:bg-white/30 transition-colors duration-300 border border-white/30"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-600">
                  Click "Add Contact" to start building your emergency contact list
                </p>
              </div>
            )}
          </GlassCard>

          {/* Contacts List */}
          <GlassCard className="p-6" hover={false}>
            <h3 className="text-xl font-bold text-purple-800 mb-6">Your Contacts ({contacts.length})</h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-800 text-lg">{contact.name}</h4>
                      <p className="text-purple-600 text-sm">{contact.relationship}</p>
                      <p className="text-purple-700 text-sm font-mono">{contact.phone}</p>
                      {contact.email && (
                        <p className="text-purple-600 text-sm">{contact.email}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editContact(contact)}
                        className="p-2 bg-blue-500/20 text-blue-600 rounded-lg hover:bg-blue-500/30 transition-colors duration-300"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteContact(contact.id)}
                        className="p-2 bg-red-500/20 text-red-600 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex-1 flex items-center justify-center space-x-2 py-2 bg-green-500/20 text-green-600 rounded-lg hover:bg-green-500/30 transition-colors duration-300"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-medium">Call</span>
                    </a>
                    <a
                      href={`sms:${contact.phone}`}
                      className="flex-1 flex items-center justify-center space-x-2 py-2 bg-blue-500/20 text-blue-600 rounded-lg hover:bg-blue-500/30 transition-colors duration-300"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-medium">Text</span>
                    </a>
                  </div>
                </div>
              ))}
              
              {contacts.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-purple-600">
                    No emergency contacts added yet
                  </p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Contact Tips */}
        <div className="mt-8">
          <GlassCard className="p-8" hover={false}>
            <h3 className="text-2xl font-bold text-purple-800 text-center mb-6">Contact Tips</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white/10 rounded-xl text-center">
                <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
                <h4 className="font-semibold text-purple-800 mb-2">Family First</h4>
                <p className="text-purple-700 text-sm">Include immediate family members who can respond quickly</p>
              </div>
              <div className="p-4 bg-white/10 rounded-xl text-center">
                <div className="text-3xl mb-2">📍</div>
                <h4 className="font-semibold text-purple-800 mb-2">Local Contacts</h4>
                <p className="text-purple-700 text-sm">Add people who live nearby and can reach you quickly</p>
              </div>
              <div className="p-4 bg-white/10 rounded-xl text-center">
                <div className="text-3xl mb-2">🔄</div>
                <h4 className="font-semibold text-purple-800 mb-2">Keep Updated</h4>
                <p className="text-purple-700 text-sm">Regularly update contact information and verify numbers</p>
              </div>
              <div className="p-4 bg-white/10 rounded-xl text-center">
                <div className="text-3xl mb-2">💬</div>
                <h4 className="font-semibold text-purple-800 mb-2">Inform Them</h4>
                <p className="text-purple-700 text-sm">Let your contacts know they're listed as emergency contacts</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};