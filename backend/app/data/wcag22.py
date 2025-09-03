from app.models import WCAGGuideline, POURPrinciple

# WCAG 2.2 Guidelines
WCAG_22_GUIDELINES = [
    # Perceivable
    WCAGGuideline(
        id="1.1.1",
        title="Non-text Content",
        description="All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.",
        level="A",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Images have alt text",
            "Decorative images are marked as such",
            "Complex images have detailed descriptions",
            "Audio content has text transcripts",
            "Video content has captions"
        ]
    ),
    WCAGGuideline(
        id="1.2.1",
        title="Audio-only and Video-only (Prerecorded)",
        description="For prerecorded audio-only and prerecorded video-only media, alternatives are provided.",
        level="A",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Audio-only content has text transcript",
            "Video-only content has text description or audio track"
        ]
    ),
    WCAGGuideline(
        id="1.2.2",
        title="Captions (Prerecorded)",
        description="Captions are provided for all prerecorded audio content in synchronized media.",
        level="A",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Synchronized captions for all audio content",
            "Captions identify speakers",
            "Captions include sound effects"
        ]
    ),
    WCAGGuideline(
        id="1.2.3",
        title="Audio Description or Media Alternative (Prerecorded)",
        description="An alternative for time-based media or audio description of the prerecorded video content is provided.",
        level="A",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Audio description for video content",
            "Alternative text-based media"
        ]
    ),
    WCAGGuideline(
        id="1.3.1",
        title="Info and Relationships",
        description="Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.",
        level="A",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Proper heading structure",
            "Form labels associated with controls",
            "Table headers properly marked",
            "Lists properly structured"
        ]
    ),
    WCAGGuideline(
        id="1.3.2",
        title="Meaningful Sequence",
        description="When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.",
        level="A",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Logical reading order",
            "Proper tab order",
            "Content sequence makes sense"
        ]
    ),
    WCAGGuideline(
        id="1.3.3",
        title="Sensory Characteristics",
        description="Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components.",
        level="A",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Instructions don't rely only on visual cues",
            "Instructions don't rely only on audio cues",
            "Multiple ways to identify elements"
        ]
    ),
    WCAGGuideline(
        id="1.4.1",
        title="Use of Color",
        description="Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.",
        level="A",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Information not conveyed by color alone",
            "Alternative visual indicators",
            "Text or symbols supplement color"
        ]
    ),
    WCAGGuideline(
        id="1.4.2",
        title="Audio Control",
        description="If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.",
        level="A",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Audio can be paused or stopped",
            "Volume control available",
            "Auto-play audio has controls"
        ]
    ),
    WCAGGuideline(
        id="1.4.3",
        title="Contrast (Minimum)",
        description="The visual presentation of text and images of text has a contrast ratio of at least 4.5:1.",
        level="AA",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Text contrast ratio 4.5:1 or higher",
            "Large text contrast ratio 3:1 or higher",
            "UI components contrast ratio 3:1 or higher"
        ]
    ),
    WCAGGuideline(
        id="1.4.4",
        title="Resize Text",
        description="Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.",
        level="AA",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Text can be resized to 200%",
            "No horizontal scrolling required",
            "Content remains readable"
        ]
    ),
    WCAGGuideline(
        id="1.4.5",
        title="Images of Text",
        description="If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text.",
        level="AA",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Use actual text instead of images of text",
            "Images of text are decorative only",
            "Text is selectable and searchable"
        ]
    ),
    WCAGGuideline(
        id="1.4.10",
        title="Reflow",
        description="Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions.",
        level="AA",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Content reflows to single column",
            "No horizontal scrolling required",
            "Content adapts to viewport width"
        ]
    ),
    WCAGGuideline(
        id="1.4.11",
        title="Non-text Contrast",
        description="The visual presentation of user interface components and graphical objects has a contrast ratio of at least 3:1 against adjacent color(s).",
        level="AA",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "UI components contrast ratio 3:1 or higher",
            "Graphical objects have sufficient contrast",
            "Focus indicators are visible"
        ]
    ),
    WCAGGuideline(
        id="1.4.12",
        title="Text Spacing",
        description="In content implemented using markup languages that support the following text style properties, no loss of content or functionality occurs by setting all of the following and by changing no other style property.",
        level="AA",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Line height can be set to 1.5",
            "Paragraph spacing can be set to 2x font size",
            "Letter spacing can be set to 0.12x font size",
            "Word spacing can be set to 0.16x font size"
        ]
    ),
    WCAGGuideline(
        id="1.4.13",
        title="Content on Hover or Focus",
        description="Where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true.",
        level="AA",
        pour_principle=POURPrinciple.PERCEIVABLE,
        success_criteria=[
            "Dismissible: A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus",
            "Hoverable: If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing",
            "Persistent: The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid"
        ]
    ),
    
    # Operable
    WCAGGuideline(
        id="2.1.1",
        title="Keyboard",
        description="All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.",
        level="A",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "All functionality accessible via keyboard",
            "No keyboard traps",
            "Keyboard shortcuts work properly"
        ]
    ),
    WCAGGuideline(
        id="2.1.2",
        title="No Keyboard Trap",
        description="If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface.",
        level="A",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Focus can be moved away from any component",
            "No keyboard traps in modals or widgets",
            "Escape key works to exit components"
        ]
    ),
    WCAGGuideline(
        id="2.1.4",
        title="Character Key Shortcuts",
        description="If a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true.",
        level="A",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Turn off: A mechanism is available to turn the shortcut off",
            "Remap: A mechanism is available to remap the shortcut to use one or more non-printable keyboard characters",
            "Active only on focus: The keyboard shortcut for a user interface component is only active when that component has focus"
        ]
    ),
    WCAGGuideline(
        id="2.2.1",
        title="Timing Adjustable",
        description="For each time limit that is set by the content, at least one of the following is true.",
        level="A",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Turn off: The user is allowed to turn off the time limit before encountering it",
            "Adjust: The user is allowed to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting",
            "Extend: The user is warned before time expires and given at least 20 seconds to extend the time limit with a simple action",
            "Real-time Exception: The time limit is a real-time event and no alternative to the time limit is possible",
            "Essential Exception: The time limit is essential and extending it would invalidate the activity",
            "20 Hour Exception: The time limit is longer than 20 hours"
        ]
    ),
    WCAGGuideline(
        id="2.2.2",
        title="Pause, Stop, Hide",
        description="For moving, blinking, scrolling, or auto-updating information, all of the following are true.",
        level="A",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Moving, blinking, scrolling: For any moving, blinking or scrolling information that starts automatically, lasts more than five seconds, and is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it",
            "Auto-updating: For any auto-updating information that starts automatically and is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it or to control the frequency of the update"
        ]
    ),
    WCAGGuideline(
        id="2.3.1",
        title="Three Flashes or Below Threshold",
        description="Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.",
        level="A",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "No content flashes more than 3 times per second",
            "Flash content is below seizure threshold",
            "No red flashing content"
        ]
    ),
    WCAGGuideline(
        id="2.4.1",
        title="Bypass Blocks",
        description="A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.",
        level="A",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Skip links to main content",
            "Skip navigation links",
            "Skip to content mechanisms"
        ]
    ),
    WCAGGuideline(
        id="2.4.2",
        title="Page Titled",
        description="Web pages have titles that describe topic or purpose.",
        level="A",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Page has descriptive title",
            "Title describes page purpose",
            "Title is unique and meaningful"
        ]
    ),
    WCAGGuideline(
        id="2.4.3",
        title="Focus Order",
        description="If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.",
        level="A",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Logical tab order",
            "Focus order makes sense",
            "Navigation preserves meaning"
        ]
    ),
    WCAGGuideline(
        id="2.4.4",
        title="Link Purpose (In Context)",
        description="The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context.",
        level="A",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Link text describes purpose",
            "Link context is clear",
            "No generic link text like 'click here'"
        ]
    ),
    WCAGGuideline(
        id="2.4.5",
        title="Multiple Ways",
        description="More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.",
        level="AA",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Multiple navigation methods",
            "Search functionality",
            "Site map or table of contents"
        ]
    ),
    WCAGGuideline(
        id="2.4.6",
        title="Headings and Labels",
        description="Headings and labels describe topic or purpose.",
        level="AA",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Descriptive headings",
            "Clear form labels",
            "Purpose is clear from heading/label"
        ]
    ),
    WCAGGuideline(
        id="2.4.7",
        title="Focus Visible",
        description="Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.",
        level="AA",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Focus indicator is visible",
            "Focus indicator has sufficient contrast",
            "Focus indicator is clearly distinguishable"
        ]
    ),
    WCAGGuideline(
        id="2.5.1",
        title="Pointer Gestures",
        description="All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture.",
        level="A",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Single pointer alternatives",
            "No complex gestures required",
            "Simple tap/click alternatives"
        ]
    ),
    WCAGGuideline(
        id="2.5.2",
        title="Pointer Cancellation",
        description="For functionality that can be operated using a single pointer, at least one of the following is true.",
        level="A",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "No Down-Event: The down-event of the pointer is not used to execute any part of the function",
            "Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion",
            "Up Reversal: The up-event reverses any outcome of the preceding down-event",
            "Essential: Completing the function on the down-event is essential"
        ]
    ),
    WCAGGuideline(
        id="2.5.3",
        title="Label in Name",
        description="For user interface components with labels that include text or images of text, the name contains the text that is presented visually.",
        level="A",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Accessible name includes visible text",
            "Label text matches accessible name",
            "No hidden text in accessible name"
        ]
    ),
    WCAGGuideline(
        id="2.5.4",
        title="Motion Actuation",
        description="Functionality that can be operated by device motion or user motion can also be operated by user interface components and can be disabled to prevent accidental actuation.",
        level="A",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "UI component alternative to motion",
            "Motion can be disabled",
            "No accidental motion activation"
        ]
    ),
    WCAGGuideline(
        id="2.5.5",
        title="Target Size",
        description="The size of the target for pointer inputs is at least 44 by 44 CSS pixels except when the target is available through an equivalent link or control on the same page that is at least 44 by 44 CSS pixels.",
        level="AAA",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Touch targets are at least 44x44 pixels",
            "Equivalent larger targets available",
            "No tiny touch targets"
        ]
    ),
    WCAGGuideline(
        id="2.5.6",
        title="Concurrent Input Mechanisms",
        description="Web content does not restrict use of input modalities available on a platform except where the restriction is essential, required to ensure the security of the content, or required to respect user settings.",
        level="AAA",
        pour_principle=POURPrinciple.OPERABLE,
        success_criteria=[
            "Multiple input methods supported",
            "No unnecessary input restrictions",
            "Platform input methods respected"
        ]
    ),
    
    # Understandable
    WCAGGuideline(
        id="3.1.1",
        title="Language of Page",
        description="The default human language of each Web page can be programmatically determined.",
        level="A",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Page language is specified",
            "HTML lang attribute is set",
            "Language is programmatically determinable"
        ]
    ),
    WCAGGuideline(
        id="3.1.2",
        title="Language of Parts",
        description="The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.",
        level="AA",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Language changes are marked",
            "Foreign language content is identified",
            "Language attributes are used"
        ]
    ),
    WCAGGuideline(
        id="3.1.3",
        title="Unusual Words",
        description="A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.",
        level="AAA",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Unusual words are defined",
            "Jargon is explained",
            "Definitions are accessible"
        ]
    ),
    WCAGGuideline(
        id="3.1.4",
        title="Abbreviations",
        description="A mechanism for identifying the expanded form or meaning of abbreviations is available.",
        level="AAA",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Abbreviations are expanded",
            "First occurrence is explained",
            "Abbreviation definitions are accessible"
        ]
    ),
    WCAGGuideline(
        id="3.1.5",
        title="Reading Level",
        description="When text requires reading ability more advanced than the lower secondary education level after removal of proper names and titles, supplemental content, or a version that does not require reading ability more advanced than the lower secondary education level, is available.",
        level="AAA",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Text is at appropriate reading level",
            "Simplified version available",
            "Complex content is explained"
        ]
    ),
    WCAGGuideline(
        id="3.1.6",
        title="Pronunciation",
        description="A mechanism is available for identifying specific pronunciation of words where meaning of the words, in context, is ambiguous without knowing the pronunciation.",
        level="AAA",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Pronunciation is provided",
            "Ambiguous words are clarified",
            "Pronunciation aids are available"
        ]
    ),
    WCAGGuideline(
        id="3.2.1",
        title="On Focus",
        description="When any user interface component receives focus, it does not initiate a change of context.",
        level="A",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Focus doesn't change context",
            "No automatic form submission on focus",
            "No automatic navigation on focus"
        ]
    ),
    WCAGGuideline(
        id="3.2.2",
        title="On Input",
        description="Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.",
        level="A",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Input changes don't change context",
            "Users are warned of context changes",
            "No unexpected navigation"
        ]
    ),
    WCAGGuideline(
        id="3.2.3",
        title="Consistent Navigation",
        description="Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages occur in the same relative order each time they are presented, unless a change is initiated by the user.",
        level="AA",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Navigation is consistent",
            "Same order across pages",
            "User-initiated changes only"
        ]
    ),
    WCAGGuideline(
        id="3.2.4",
        title="Consistent Identification",
        description="Components that have the same functionality within a set of Web pages are identified consistently.",
        level="AA",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Same functionality has same identification",
            "Consistent labeling",
            "Consistent naming conventions"
        ]
    ),
    WCAGGuideline(
        id="3.2.5",
        title="Change on Request",
        description="Changes of context are initiated only by user request or a mechanism is available to turn off such changes.",
        level="AAA",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Context changes are user-initiated",
            "Automatic changes can be disabled",
            "No unexpected context changes"
        ]
    ),
    WCAGGuideline(
        id="3.3.1",
        title="Error Identification",
        description="If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.",
        level="A",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Errors are clearly identified",
            "Error descriptions are provided",
            "Error location is specified"
        ]
    ),
    WCAGGuideline(
        id="3.3.2",
        title="Labels or Instructions",
        description="Labels or instructions are provided when content requires user input.",
        level="A",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Form labels are provided",
            "Instructions are clear",
            "Required fields are marked"
        ]
    ),
    WCAGGuideline(
        id="3.3.3",
        title="Error Suggestion",
        description="If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.",
        level="AA",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Error correction suggestions provided",
            "Helpful error messages",
            "Specific guidance for fixes"
        ]
    ),
    WCAGGuideline(
        id="3.3.4",
        title="Error Prevention (Legal, Financial, Data)",
        description="For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true.",
        level="AA",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Reversible: Submissions are reversible",
            "Checked: Data entered by the user is checked for input errors and the user is provided an opportunity to correct them",
            "Confirmed: A mechanism is available for reviewing, confirming, and correcting information before finalizing the submission"
        ]
    ),
    WCAGGuideline(
        id="3.3.5",
        title="Help",
        description="Context-sensitive help is available.",
        level="AAA",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Help is available when needed",
            "Context-sensitive assistance",
            "Help is easily accessible"
        ]
    ),
    WCAGGuideline(
        id="3.3.6",
        title="Error Prevention (All)",
        description="For Web pages that require the user to submit information, at least one of the following is true.",
        level="AAA",
        pour_principle=POURPrinciple.UNDERSTANDABLE,
        success_criteria=[
            "Reversible: Submissions are reversible",
            "Checked: Data entered by the user is checked for input errors and the user is provided an opportunity to correct them",
            "Confirmed: A mechanism is available for reviewing, confirming, and correcting information before finalizing the submission"
        ]
    ),
    
    # Robust
    WCAGGuideline(
        id="4.1.1",
        title="Parsing",
        description="In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique.",
        level="A",
        pour_principle=POURPrinciple.ROBUST,
        success_criteria=[
            "Valid HTML markup",
            "Proper element nesting",
            "No duplicate attributes",
            "Unique IDs"
        ]
    ),
    WCAGGuideline(
        id="4.1.2",
        title="Name, Role, Value",
        description="For all user interface components, the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.",
        level="A",
        pour_principle=POURPrinciple.ROBUST,
        success_criteria=[
            "Component name is programmatically determinable",
            "Component role is programmatically determinable",
            "Component state is programmatically determinable",
            "Component value is programmatically determinable"
        ]
    ),
    WCAGGuideline(
        id="4.1.3",
        title="Status Messages",
        description="In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.",
        level="AA",
        pour_principle=POURPrinciple.ROBUST,
        success_criteria=[
            "Status messages are programmatically determinable",
            "Messages are announced to assistive technology",
            "No focus required for status updates"
        ]
    )
]

# POUR Principles
POUR_PRINCIPLES = {
    POURPrinciple.PERCEIVABLE: {
        "title": "Perceivable",
        "description": "Information and user interface components must be presentable to users in ways they can perceive.",
        "guidelines": [g for g in WCAG_22_GUIDELINES if g.pour_principle == POURPrinciple.PERCEIVABLE]
    },
    POURPrinciple.OPERABLE: {
        "title": "Operable",
        "description": "User interface components and navigation must be operable.",
        "guidelines": [g for g in WCAG_22_GUIDELINES if g.pour_principle == POURPrinciple.OPERABLE]
    },
    POURPrinciple.UNDERSTANDABLE: {
        "title": "Understandable",
        "description": "Information and the operation of user interface must be understandable.",
        "guidelines": [g for g in WCAG_22_GUIDELINES if g.pour_principle == POURPrinciple.UNDERSTANDABLE]
    },
    POURPrinciple.ROBUST: {
        "title": "Robust",
        "description": "Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.",
        "guidelines": [g for g in WCAG_22_GUIDELINES if g.pour_principle == POURPrinciple.ROBUST]
    }
}
