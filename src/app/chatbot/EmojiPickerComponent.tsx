'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false })

interface EmojiPickerComponentProps {
  onEmojiClick: (emojiData: { unified: string; names: string[]; }) => void
}

const EmojiPickerComponent: React.FC<EmojiPickerComponentProps> = ({ onEmojiClick }) => {
  return <EmojiPicker onEmojiClick={onEmojiClick} lazyLoadEmojis />
}

export default EmojiPickerComponent
