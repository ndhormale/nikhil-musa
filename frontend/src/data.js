export const scenarios = {
  normal: {
    title: 'Normal Conversation', subtitle: 'Friendly conversation with no significant harmful escalation.',
    messages: [
      ['alex', 'Hey, how are you?'], ['you', "I'm good! What about you?"], ['alex', 'Pretty good — I just got back from college.'],
      ['you', 'Nice! Did you finish your assignment?'], ['alex', 'Finally. That presentation was actually fun.'], ['you', 'That was really funny 😂'],
      ['alex', 'What music do you listen to?'], ['you', "I'm trying to learn Python between classes."], ['alex', "That's cool. Good luck for your exam tomorrow!"],
      ['you', 'Thanks for helping me yesterday.'], ['alex', "Let's grab coffee sometime."], ['you', 'Sounds good — have a good night!']
    ]
  },
  gradual: {
    title: 'Gradual Escalation', subtitle: 'A realistic progression from trust-building to potentially harmful requests.',
    messages: [
      ['alex', 'Hey, how was your day?'], ['you', 'A little busy, but okay.'], ['alex', "I'm glad we can talk like this."], ['you', 'Me too.'],
      ['alex', "You're really easy to talk to."], ['alex', "I don't usually open up this quickly."], ['you', 'I appreciate you sharing that.'],
      ['alex', 'I feel like you actually understand me.'], ['alex', "You're the only person who really understands me."], ['you', 'That sounds like a lot to carry.'],
      ['alex', "I don't know what I'd do without you."], ['alex', "Please don't disappear on me."], ['alex', "Don't tell anyone about us."],
      ['you', 'Why would I need to hide it?'], ['alex', "People wouldn't understand what we have."], ['alex', "Your friends might try to separate us."],
      ['alex', "If you really care about me, you'll do this."], ['you', 'What do you mean?'], ['alex', 'I thought you trusted me after everything I told you.'],
      ['alex', "I need your help right now. This can't wait until tomorrow."], ['you', "What's going on?"], ['alex', 'I only have a few minutes. Please trust me right now.'],
      ['alex', 'Can you lend me ₹2,000?'], ['alex', "I need ₹10,000 urgently. I'll pay you back tomorrow."],
      ['alex', "Please don't tell anyone I asked you."], ['alex', 'Can you send me a private photo too?'], ['alex', 'Nobody else will see it — prove that you trust me.']
    ]
  },
  high: {
    title: 'High Risk Conversation', subtitle: 'Multiple forms of pressure, secrecy, verification avoidance and requests.',
    messages: [
      ['alex', 'I changed my account recently; this is my backup account.'], ['you', 'Okay, why?'], ['alex', "Don't worry about the different name. I'll explain later."],
      ['alex', "You're the only person I can rely on."], ['alex', "Don't tell your friends about us."], ['alex', "Your family will only interfere."],
      ['alex', 'Why do we need a video call? My camera is not working.'], ['alex', 'Stop asking me to verify — just trust me.'],
      ['alex', 'If you loved me, you would help.'], ['alex', "I thought I meant more to you."], ['alex', "It's an emergency. I only have 30 minutes."],
      ['alex', 'Can you pay this bill for me?'], ['alex', 'I need ₹15,000 today. Please make the transfer before 6 PM.'],
      ['alex', "Don't show this conversation to anyone."], ['alex', 'Send me something more personal — nobody will ever see it.'],
      ['alex', "I'll delete it afterward. Prove that you trust me."], ['alex', 'Just send it and I will explain later.']
    ]
  }
};

// The default chat is deliberately paced: Alex only moves to the next stage
// after the user replies. This makes the safety story demonstrable as a real chat.
export const liveChat = [
  { text: 'Hello! I’m glad we can chat. How has your day been?', suggestion: 'I’m doing well, thanks. How about you?' },
  { text: 'That’s nice to hear. What have you been working on lately?', suggestion: 'I’ve been working on some coursework.' },
  { text: 'You’re really easy to talk to. I like our conversations.', suggestion: 'That’s kind of you to say.' },
  { text: 'I feel like you actually understand me.', suggestion: 'I’m glad you feel heard.' },
  { text: 'I don’t usually open up this quickly.', suggestion: 'You can share only what feels comfortable.' },
  { text: 'You’re the only person who really understands me.', suggestion: 'It is good to have more than one person for support.' },
  { text: 'I don’t know what I’d do without you. Please don’t disappear on me.', suggestion: 'That feels like a lot of pressure.' },
  { text: 'Don’t tell anyone about our conversations. Keep this between us.', suggestion: 'Why would I need to keep it secret?' },
  { text: 'People wouldn’t understand what we have. Your friends might try to separate us.', suggestion: 'My friends’ opinions still matter to me.' },
  { text: 'If you really care about me, you’ll do this.', suggestion: 'What are you asking me to do?' },
  { text: 'I thought you trusted me after everything I told you.', suggestion: 'Trust should not require me to ignore my concerns.' },
  { text: 'I need your help right now. This can’t wait until tomorrow.', suggestion: 'What is going on?' },
  { text: 'I only have a few minutes. Please trust me right now.', suggestion: 'I need time to think before I respond.' },
  { text: 'Can you lend me ₹2,000? I’ll pay you back tomorrow.', suggestion: 'I don’t send money when I feel pressured.' },
  { text: 'I need ₹10,000 urgently. Please don’t tell anyone I asked you.', suggestion: 'I’m going to verify this independently first.' },
  { text: 'Can you send me a private photo? Nobody else will see it — prove that you trust me.', suggestion: 'No. I will not share private content.' }
];

export const signalMeta = {
  emotional_dependency: ['♡', 'Emotional dependency', 12, 'Language suggests you are being positioned as the only source of support.'],
  secrecy: ['⌁', 'Secrecy', 15, 'The conversation asks you to hide it from people you trust.'],
  isolation: ['◎', 'Isolation', 12, 'The speaker discourages support or outside perspectives.'],
  emotional_pressure: ['!', 'Emotional pressure', 15, 'Care or trust is being linked to compliance.'],
  guilt_manipulation: ['!', 'Guilt manipulation', 10, 'The message uses guilt to make declining feel difficult.'],
  urgency: ['◷', 'Urgency', 10, 'The request is framed as requiring an immediate response.'],
  time_pressure: ['◷', 'Time pressure', 8, 'A short deadline can limit time to think or verify.'],
  financial_request: ['₹', 'Financial request', 20, 'A request for money appeared in this conversation.'],
  private_content_request: ['▣', 'Private-content request', 20, 'The conversation asks for personal or private content.'],
  verification_avoidance: ['?', 'Verification avoidance', 12, 'The speaker discourages independent confirmation.'],
  identity_inconsistency: ['≋', 'Identity inconsistency', 8, 'Account or identity details are deferred or inconsistent.']
};
