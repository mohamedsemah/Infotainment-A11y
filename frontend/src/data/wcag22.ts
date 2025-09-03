import { WCAGGuideline } from '../types';

export const WCAG_2_2_GUIDELINES: WCAGGuideline[] = [
  // PERCEIVABLE
  {
    id: '1.1.1',
    principle: 'Perceivable',
    guideline: '1.1 Text Alternatives',
    successCriteria: '1.1.1 Non-Text Content',
    level: 'AA',
    description: 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.',
    version: '2.0'
  },
  {
    id: '1.2.1',
    principle: 'Perceivable',
    guideline: '1.2 Time-based Media',
    successCriteria: '1.2.1 Audio-only and Video-only (Prerecorded)',
    level: 'A',
    description: 'For prerecorded audio-only and prerecorded video-only media, alternatives are provided.',
    version: '2.0'
  },
  {
    id: '1.2.2',
    principle: 'Perceivable',
    guideline: '1.2 Time-based Media',
    successCriteria: '1.2.2 Captions (Prerecorded)',
    level: 'A',
    description: 'Captions are provided for all prerecorded audio content in synchronized media.',
    version: '2.0'
  },
  {
    id: '1.2.3',
    principle: 'Perceivable',
    guideline: '1.2 Time-based Media',
    successCriteria: '1.2.3 Audio Description or Media Alternative (Prerecorded)',
    level: 'A',
    description: 'An alternative for time-based media or audio description of the prerecorded video content is provided.',
    version: '2.0'
  },
  {
    id: '1.2.4',
    principle: 'Perceivable',
    guideline: '1.2 Time-based Media',
    successCriteria: '1.2.4 Captions (Live)',
    level: 'AA',
    description: 'Captions are provided for all live audio content in synchronized media.',
    version: '2.0'
  },
  {
    id: '1.2.5',
    principle: 'Perceivable',
    guideline: '1.2 Time-based Media',
    successCriteria: '1.2.5 Audio Description (Prerecorded)',
    level: 'AA',
    description: 'Audio description is provided for all prerecorded video content in synchronized media.',
    version: '2.0'
  },
  {
    id: '1.3.1',
    principle: 'Perceivable',
    guideline: '1.3 Adaptable',
    successCriteria: '1.3.1 Info and Relationships',
    level: 'A',
    description: 'Information, structure, and relationships conveyed through presentation can be programmatically determined.',
    version: '2.0'
  },
  {
    id: '1.3.2',
    principle: 'Perceivable',
    guideline: '1.3 Adaptable',
    successCriteria: '1.3.2 Meaningful Sequence',
    level: 'A',
    description: 'When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.',
    version: '2.0'
  },
  {
    id: '1.3.3',
    principle: 'Perceivable',
    guideline: '1.3 Adaptable',
    successCriteria: '1.3.3 Sensory Characteristics',
    level: 'A',
    description: 'Instructions provided for understanding and operating content do not rely solely on sensory characteristics.',
    version: '2.0'
  },
  {
    id: '1.3.4',
    principle: 'Perceivable',
    guideline: '1.3 Adaptable',
    successCriteria: '1.3.4 Orientation',
    level: 'AA',
    description: 'Content does not restrict its view and operation to a single display orientation.',
    version: '2.1'
  },
  {
    id: '1.3.5',
    principle: 'Perceivable',
    guideline: '1.3 Adaptable',
    successCriteria: '1.3.5 Identify Input Purpose',
    level: 'AA',
    description: 'The purpose of each input field collecting information about the user can be programmatically determined.',
    version: '2.1'
  },
  {
    id: '1.4.1',
    principle: 'Perceivable',
    guideline: '1.4 Distinguishable',
    successCriteria: '1.4.1 Use of Color',
    level: 'A',
    description: 'Color is not used as the only visual means of conveying information.',
    version: '2.0'
  },
  {
    id: '1.4.2',
    principle: 'Perceivable',
    guideline: '1.4 Distinguishable',
    successCriteria: '1.4.2 Audio Control',
    level: 'A',
    description: 'If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio.',
    version: '2.0'
  },
  {
    id: '1.4.3',
    principle: 'Perceivable',
    guideline: '1.4 Distinguishable',
    successCriteria: '1.4.3 Contrast (Minimum)',
    level: 'AA',
    description: 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1.',
    version: '2.0'
  },
  {
    id: '1.4.4',
    principle: 'Perceivable',
    guideline: '1.4 Distinguishable',
    successCriteria: '1.4.4 Resize Text',
    level: 'AA',
    description: 'Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.',
    version: '2.0'
  },
  {
    id: '1.4.5',
    principle: 'Perceivable',
    guideline: '1.4 Distinguishable',
    successCriteria: '1.4.5 Images of Text',
    level: 'AA',
    description: 'If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text.',
    version: '2.0'
  },
  {
    id: '1.4.10',
    principle: 'Perceivable',
    guideline: '1.4 Distinguishable',
    successCriteria: '1.4.10 Reflow',
    level: 'AA',
    description: 'Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions.',
    version: '2.1'
  },
  {
    id: '1.4.11',
    principle: 'Perceivable',
    guideline: '1.4 Distinguishable',
    successCriteria: '1.4.11 Non-text Contrast',
    level: 'AA',
    description: 'The visual presentation of user interface components and graphical objects has a contrast ratio of at least 3:1.',
    version: '2.1'
  },
  {
    id: '1.4.12',
    principle: 'Perceivable',
    guideline: '1.4 Distinguishable',
    successCriteria: '1.4.12 Text Spacing',
    level: 'AA',
    description: 'In content implemented using markup languages that support text spacing, no loss of content or functionality occurs.',
    version: '2.1'
  },
  {
    id: '1.4.13',
    principle: 'Perceivable',
    guideline: '1.4 Distinguishable',
    successCriteria: '1.4.13 Content on Hover or Focus',
    level: 'AA',
    description: 'Where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the additional content is dismissible, hoverable, and persistent.',
    version: '2.1'
  },

  // OPERABLE
  {
    id: '2.1.1',
    principle: 'Operable',
    guideline: '2.1 Keyboard Accessible',
    successCriteria: '2.1.1 Keyboard',
    level: 'A',
    description: 'All functionality of the content is operable through a keyboard interface.',
    version: '2.0'
  },
  {
    id: '2.1.2',
    principle: 'Operable',
    guideline: '2.1 Keyboard Accessible',
    successCriteria: '2.1.2 No Keyboard Trap',
    level: 'A',
    description: 'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component.',
    version: '2.0'
  },
  {
    id: '2.1.4',
    principle: 'Operable',
    guideline: '2.1 Keyboard Accessible',
    successCriteria: '2.1.4 Character Key Shortcuts',
    level: 'AAA',
    description: 'If a keyboard shortcut is implemented in content using only letter, punctuation, number, or symbol characters, then a mechanism is available to turn the shortcut off or to remap the shortcut.',
    version: '2.1'
  },
  {
    id: '2.2.1',
    principle: 'Operable',
    guideline: '2.2 Enough Time',
    successCriteria: '2.2.1 Timing Adjustable',
    level: 'A',
    description: 'For each time limit that is set by the content, at least one of the following is true: The user can turn off the time limit before encountering it.',
    version: '2.0'
  },
  {
    id: '2.2.2',
    principle: 'Operable',
    guideline: '2.2 Enough Time',
    successCriteria: '2.2.2 Pause, Stop, Hide',
    level: 'A',
    description: 'For moving, blinking, scrolling, or auto-updating information, all of the following are true: Moving, blinking, scrolling, and auto-updating information can be paused, stopped, or hidden.',
    version: '2.0'
  },
  {
    id: '2.3.1',
    principle: 'Operable',
    guideline: '2.3 Seizures',
    successCriteria: '2.3.1 Three Flashes or Below Threshold',
    level: 'A',
    description: 'Web pages do not contain anything that flashes more than three times in any one second period.',
    version: '2.0'
  },
  {
    id: '2.4.1',
    principle: 'Operable',
    guideline: '2.4 Navigable',
    successCriteria: '2.4.1 Bypass Blocks',
    level: 'A',
    description: 'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.',
    version: '2.0'
  },
  {
    id: '2.4.2',
    principle: 'Operable',
    guideline: '2.4 Navigable',
    successCriteria: '2.4.2 Page Titled',
    level: 'A',
    description: 'Web pages have titles that describe topic or purpose.',
    version: '2.0'
  },
  {
    id: '2.4.3',
    principle: 'Operable',
    guideline: '2.4 Navigable',
    successCriteria: '2.4.3 Focus Order',
    level: 'A',
    description: 'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
    version: '2.0'
  },
  {
    id: '2.4.4',
    principle: 'Operable',
    guideline: '2.4 Navigable',
    successCriteria: '2.4.4 Link Purpose (In Context)',
    level: 'A',
    description: 'The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context.',
    version: '2.0'
  },
  {
    id: '2.4.5',
    principle: 'Operable',
    guideline: '2.4 Navigable',
    successCriteria: '2.4.5 Multiple Ways',
    level: 'AA',
    description: 'More than one way is available to locate a Web page within a set of Web pages.',
    version: '2.0'
  },
  {
    id: '2.4.6',
    principle: 'Operable',
    guideline: '2.4 Navigable',
    successCriteria: '2.4.6 Headings and Labels',
    level: 'AA',
    description: 'Headings and labels describe topic or purpose.',
    version: '2.0'
  },
  {
    id: '2.4.7',
    principle: 'Operable',
    guideline: '2.4 Navigable',
    successCriteria: '2.4.7 Focus Visible',
    level: 'AA',
    description: 'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.',
    version: '2.0'
  },
  {
    id: '2.5.1',
    principle: 'Operable',
    guideline: '2.5 Input Modalities',
    successCriteria: '2.5.1 Pointer Gestures',
    level: 'AA',
    description: 'All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture.',
    version: '2.1'
  },
  {
    id: '2.5.2',
    principle: 'Operable',
    guideline: '2.5 Input Modalities',
    successCriteria: '2.5.2 Pointer Cancellation',
    level: 'AA',
    description: 'For functionality that can be operated using a single pointer, at least one of the following is true: No Down-Event, Abort or Undo, Up Reversal, Essential.',
    version: '2.1'
  },
  {
    id: '2.5.3',
    principle: 'Operable',
    guideline: '2.5 Input Modalities',
    successCriteria: '2.5.3 Label in Name',
    level: 'AA',
    description: 'For user interface components with labels that include text or images of text, the name contains the text that is presented visually.',
    version: '2.1'
  },
  {
    id: '2.5.4',
    principle: 'Operable',
    guideline: '2.5 Input Modalities',
    successCriteria: '2.5.4 Motion Activation',
    level: 'AA',
    description: 'Functionality that can be operated by device motion or user motion can also be operated by user interface components.',
    version: '2.1'
  },
  {
    id: '2.5.5',
    principle: 'Operable',
    guideline: '2.5 Input Modalities',
    successCriteria: '2.5.5 Target Size',
    level: 'AA',
    description: 'The size of the target for pointer inputs is at least 44 by 44 CSS pixels.',
    version: '2.1'
  },
  {
    id: '2.5.7',
    principle: 'Operable',
    guideline: '2.5 Input Modalities',
    successCriteria: '2.5.7 Dragging',
    level: 'AA',
    description: 'All functionality that uses a dragging movement for operation can be achieved by a single pointer without dragging.',
    version: '2.2'
  },
  {
    id: '2.5.8',
    principle: 'Operable',
    guideline: '2.5 Input Modalities',
    successCriteria: '2.5.8 Target Size (Minimum)',
    level: 'AAA',
    description: 'The size of the target for pointer inputs is at least 24 by 24 CSS pixels.',
    version: '2.2'
  },

  // UNDERSTANDABLE
  {
    id: '3.1.1',
    principle: 'Understandable',
    guideline: '3.1 Readable',
    successCriteria: '3.1.1 Language of Page',
    level: 'A',
    description: 'The default human language of each Web page can be programmatically determined.',
    version: '2.0'
  },
  {
    id: '3.1.2',
    principle: 'Understandable',
    guideline: '3.1 Readable',
    successCriteria: '3.1.2 Language of Parts',
    level: 'AA',
    description: 'The human language of each passage or phrase in the content can be programmatically determined.',
    version: '2.0'
  },
  {
    id: '3.2.1',
    principle: 'Understandable',
    guideline: '3.2 Predictable',
    successCriteria: '3.2.1 On Focus',
    level: 'A',
    description: 'When any component receives focus, it does not initiate a change of context.',
    version: '2.0'
  },
  {
    id: '3.2.2',
    principle: 'Understandable',
    guideline: '3.2 Predictable',
    successCriteria: '3.2.2 On Input',
    level: 'A',
    description: 'Changing the setting of any user interface component does not automatically cause a change of context.',
    version: '2.0'
  },
  {
    id: '3.2.3',
    principle: 'Understandable',
    guideline: '3.2 Predictable',
    successCriteria: '3.2.3 Consistent Navigation',
    level: 'AA',
    description: 'Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages occur in the same relative order each time they are repeated.',
    version: '2.0'
  },
  {
    id: '3.2.4',
    principle: 'Understandable',
    guideline: '3.2 Predictable',
    successCriteria: '3.2.4 Consistent Identification',
    level: 'AA',
    description: 'Components that have the same functionality within a set of Web pages are identified consistently.',
    version: '2.0'
  },
  {
    id: '3.3.1',
    principle: 'Understandable',
    guideline: '3.3 Input Assistance',
    successCriteria: '3.3.1 Error Identification',
    level: 'A',
    description: 'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
    version: '2.0'
  },
  {
    id: '3.3.2',
    principle: 'Understandable',
    guideline: '3.3 Input Assistance',
    successCriteria: '3.3.2 Labels or Instructions',
    level: 'A',
    description: 'Labels or instructions are provided when content requires user input.',
    version: '2.0'
  },
  {
    id: '3.3.3',
    principle: 'Understandable',
    guideline: '3.3 Input Assistance',
    successCriteria: '3.3.3 Error Suggestion',
    level: 'AA',
    description: 'If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user.',
    version: '2.0'
  },
  {
    id: '3.3.4',
    principle: 'Understandable',
    guideline: '3.3 Input Assistance',
    successCriteria: '3.3.4 Error Prevention (Legal, Financial, Data)',
    level: 'AA',
    description: 'For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses.',
    version: '2.0'
  },

  // ROBUST
  {
    id: '4.1.1',
    principle: 'Robust',
    guideline: '4.1 Compatible',
    successCriteria: '4.1.1 Parsing',
    level: 'A',
    description: 'In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications.',
    version: '2.0'
  },
  {
    id: '4.1.2',
    principle: 'Robust',
    guideline: '4.1 Compatible',
    successCriteria: '4.1.2 Name, Role, Value',
    level: 'A',
    description: 'For all user interface components, the name and role can be programmatically determined.',
    version: '2.0'
  },
  {
    id: '4.1.3',
    principle: 'Robust',
    guideline: '4.1 Compatible',
    successCriteria: '4.1.3 Status Messages',
    level: 'AA',
    description: 'In content implemented using markup languages, status messages can be programmatically determined through role or properties.',
    version: '2.1'
  }
];

export const POUR_PRINCIPLES = [
  'Perceivable',
  'Operable', 
  'Understandable',
  'Robust'
] as const;

export const WCAG_LEVELS = ['A', 'AA', 'AAA'] as const;
