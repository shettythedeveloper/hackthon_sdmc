import { ElectionStage, PollingStationStep, JargonTerm, QuizQuestion, TimelineMilestone, StatutoryRight } from '../types';

export const ELECTION_STAGES: ElectionStage[] = [
  {
    id: 'stage-1',
    number: 1,
    title: 'Voter List Preparation & Pre-Election Readiness',
    badge: 'Stage 1: Foundation',
    timeframe: '6 to 12 Months before Polling',
    summary: 'Democracy begins long before votes are cast. Election authorities update electoral rolls, designate polling boundaries, and allow citizens to register or correct their personal details.',
    keyActors: ['Election Commission / Local Election Board', 'Electoral Registration Officers (ERO)', 'Booth Level Officers (BLO)', 'Citizens / Eligible Youth'],
    procedures: [
      {
        title: 'Summary Revision of Electoral Rolls',
        detail: 'Annual or special revision drives allowing new eligible citizens (turning 18) to enroll and allowing existing voters to update their residential address.',
        iconName: 'UserCheck'
      },
      {
        title: 'Delimitation & Polling Station Mapping',
        detail: 'Geographical boundaries of constituencies are mapped to maintain fair voter ratios, ensuring polling booths are within walking distance (typically under 2km for every citizen).',
        iconName: 'MapPin'
      },
      {
        title: 'Publication of Draft and Final Voter Lists',
        detail: 'The public draft roll is made open for claims and objections. Citizens can verify whether their names are present and spelled correctly.',
        iconName: 'FileText'
      }
    ],
    voterResponsibilities: [
      'Check your name on the electoral roll online or via official helpline apps.',
      'Submit Form 6 for new enrollment if you just reached legal voting age.',
      'Update your address using Form 8 if you moved to a new constituency.',
      'Note your polling booth number, part number, and serial number.'
    ],
    mythVsFact: {
      myth: 'Having a physical plastic Voter ID card is enough to guarantee I can vote.',
      fact: 'Your name MUST be on the official Electoral Roll for your constituency. If your name is not registered on the roll, a card alone will not permit you to vote.',
      whyItMatters: 'Always verify your registration status online before polling day, not on the morning of elections.'
    },
    integrityMeasures: [
      'Door-to-door verification by Booth Level Officers.',
      'Public inspection of voter lists to eliminate duplicates and deceased entries.',
      'Multi-party all-party observer meetings during list finalization.'
    ]
  },
  {
    id: 'stage-2',
    number: 2,
    title: 'Election Notification, Nominations & Scrutiny',
    badge: 'Stage 2: Candidacy',
    timeframe: '4 to 6 Weeks before Polling',
    summary: 'The formal race begins when the election is officially notified. Candidates submit sworn affidavits, undergo legal qualification checks, and receive authorized ballot symbols.',
    keyActors: ['Returning Officer (RO)', 'Prospective Candidates & Political Parties', 'General Public & Scrutiny Observers'],
    procedures: [
      {
        title: 'Presidential / Official Gazette Notification',
        detail: 'The statutory announcement fixing key dates: last date for filing, scrutiny, withdrawal, polling date, and counting schedule.',
        iconName: 'BellRing'
      },
      {
        title: 'Filing Nomination Papers & Sworn Affidavits',
        detail: 'Candidates submit mandatory declarations disclosing criminal antecedents (if any), assets & liabilities, educational qualifications, and security deposits.',
        iconName: 'ClipboardCheck'
      },
      {
        title: 'Quasi-Judicial Scrutiny of Nominations',
        detail: 'Returning Officers inspect nomination papers in public view of opposing candidates to reject fraudulent or disqualified filings.',
        iconName: 'ShieldAlert'
      },
      {
        title: 'Allocation of Election Symbols',
        detail: 'Recognized political parties retain reserved symbols; independent candidates select from authorized free symbols to aid illiterate or visually guided voters.',
        iconName: 'Sparkles'
      }
    ],
    voterResponsibilities: [
      'Review candidates\' sworn affidavits (affidavit portal) to assess background, assets, and court cases.',
      'Examine party manifestos and candidate policy pledges objectively.',
      'Verify which constituency and local district you are voting in.'
    ],
    mythVsFact: {
      myth: 'Election officials can arbitrarily disqualify any candidate they dislike.',
      fact: 'Scrutiny happens under strict statutory laws in the presence of candidate legal representatives. Any rejection must be recorded in writing with legal justification.',
      whyItMatters: 'Guarantees equal competitive opportunity for independent and opposition candidates.'
    },
    integrityMeasures: [
      'Public display of candidate assets and criminal disclosures online within 24 hours.',
      'Mandatory security deposit forfeiture if candidate fails to secure 1/6th of valid votes.'
    ]
  },
  {
    id: 'stage-3',
    number: 3,
    title: 'Campaigning & Model Code of Conduct (MCC)',
    badge: 'Stage 3: Campaign & Rules',
    timeframe: '2 to 3 Weeks leading up to 48 Hours before Poll',
    summary: 'Candidates present their visions to voters while complying with ethical rules. The Model Code of Conduct ensures that ruling governments cannot misuse state resources for electoral gain.',
    keyActors: ['Candidates & Campaigners', 'Flying Squads & Static Surveillance Teams', 'Expenditure Observers', 'Media Watchdogs'],
    procedures: [
      {
        title: 'Level Playing Field Enforcement',
        detail: 'Government cannot announce new policy concessions, distribute discretionary grants, or use official vehicles or government aircraft for political rallies.',
        iconName: 'Scale'
      },
      {
        title: 'Expenditure Monitoring & Limits',
        detail: 'Candidate campaign bank accounts are audited daily. Maximum expenditure ceilings prevent uncontrolled commercial domination of elections.',
        iconName: 'BadgeDollarSign'
      },
      {
        title: 'The 48-Hour Campaign Silence Period',
        detail: 'All public rallies, loud audio broadcasts, television ads, and political street campaigns must halt 48 hours before polling closes to give voters peaceful reflection time.',
        iconName: 'VolumeX'
      }
    ],
    voterResponsibilities: [
      'Report MCC violations (cash/liquor distribution, hate speeches) to election hotlines or observer teams.',
      'Beware of deepfakes, manipulated clips, and disinformation on messaging groups.',
      'Take advantage of the 48-hour quiet period to review non-partisan guides.'
    ],
    mythVsFact: {
      myth: 'Ruling parties can use state-funded government ads to promote their party during the campaign.',
      fact: 'From the minute the election schedule is announced, all government advertisements at public expense praising achievements are strictly prohibited.',
      whyItMatters: 'Protects taxpayers money from being exploited for partisan political advantage.'
    },
    integrityMeasures: [
      'GPS-tracked Flying Squads responding to citizen tips within 100 minutes.',
      'CCTV recording of all candidate major public rallies and vehicle convoys.'
    ]
  },
  {
    id: 'stage-4',
    number: 4,
    title: 'Polling Day: Voting Booth Procedures & The Secret Ballot',
    badge: 'Stage 4: D-Day (Voting)',
    timeframe: 'Polling Day (Typically 7:00 AM to 6:00 PM)',
    summary: 'The culmination of civic participation. Voters enter designated polling booths, verify identity, receive indelible ink, and cast their confidential ballot in absolute privacy.',
    keyActors: ['Presiding Officer & Polling Officers (PO 1, 2, 3)', 'Polling Agents (Party Representatives)', 'Central Security Forces', 'Voters'],
    procedures: [
      {
        title: 'Mock Poll in Presence of Party Agents',
        detail: 'At 5:30 AM before voting begins, at least 50 test votes are cast in front of candidate agents on each EVM/machine to prove zero prior votes and verify 100% accuracy.',
        iconName: 'CheckCircle2'
      },
      {
        title: '4-Step Sequential Voter Processing',
        detail: 'Identity check on roll -> Indelible ink application on left forefinger -> Signature/Thumbprint in register -> Private vote casting behind secrecy screen.',
        iconName: 'Footprints'
      },
      {
        title: 'Voter Verifiable Paper Audit Trail (VVPAT)',
        detail: 'The voter presses the button. A printed paper slip displaying candidate name, number, and symbol is visible through a lighted glass window for 7 seconds before dropping into a secure container.',
        iconName: 'Printer'
      },
      {
        title: 'Closing and Machine Sealing at 6:00 PM',
        detail: 'The Presiding Officer presses the CLOSE button on the Control Unit. High-security green paper and special numbered tags are signed by all party agents present.',
        iconName: 'Lock'
      }
    ],
    voterResponsibilities: [
      'Carry one valid, authorized government photo identity document.',
      'Keep mobile phones, cameras, or recording devices outside the voting compartment.',
      'Do not reveal or photograph your cast ballot (ballot secrecy is protected by law).',
      'If you are in the queue at 6:00 PM, you ARE entitled to vote; the Presiding Officer will issue slips.'
    ],
    mythVsFact: {
      myth: 'If someone already cast a vote in my name, I lose my right to vote completely.',
      fact: 'You can request a "Tendered Ballot" from the Presiding Officer. After verifying your true identity, you vote on a special ballot paper sealed in an envelope for judicial review.',
      whyItMatters: 'Ensures that impersonation attempts do not disenfranchise genuine registered citizens.'
    },
    integrityMeasures: [
      'Secrecy screen guarantees no camera or person can see which button you press.',
      'Indelible silver nitrate ink prevents anyone from voting more than once.',
      'Form 17C account of votes recorded is handed over to candidate agents immediately upon poll close.'
    ]
  },
  {
    id: 'stage-5',
    number: 5,
    title: 'Strongroom Guarding, Vote Counting & Results Declaration',
    badge: 'Stage 5: Verdict',
    timeframe: 'Post-Poll to Counting Day',
    summary: 'Ballot boxes and EVMs are sealed in fortified multi-tiered strongrooms until counting day. Counting takes place in front of candidate agents, followed by official certification of the winner.',
    keyActors: ['Returning Officer', 'Counting Supervisors & Micro-observers', 'Armed Paramilitary Guards', 'Candidate Counting Agents'],
    procedures: [
      {
        title: 'Multi-Layer Strongroom Security',
        detail: 'Machines are stored in double-locked rooms guarded by 24/7 armed central forces, monitored with uninterrupted CCTV feeds visible to candidate agents on live monitors.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Round-by-Round Public Counting',
        detail: 'Postal ballots are counted first, followed by EVM Control Units table by table. Before opening any machine, candidate agents verify seal numbers against Form 17C.',
        iconName: 'Calculator'
      },
      {
        title: 'Mandatory VVPAT Paper Slip Audit',
        detail: 'In randomly selected polling stations per constituency, paper slips from VVPAT boxes are hand-counted to cross-verify electronic results with 100% precision.',
        iconName: 'FileSearch'
      },
      {
        title: 'Return of Election & Certificate Issuance',
        detail: 'The candidate with the highest valid votes is declared elected, and an official Certificate of Election (Form 22) is handed over by the Returning Officer.',
        iconName: 'Trophy'
      }
    ],
    voterResponsibilities: [
      'Track certified results through official Election Commission portals rather than unverified social media rumors.',
      'Respect the democratic mandate peacefully.',
      'Hold elected representatives accountable to their manifestos throughout their term.'
    ],
    mythVsFact: {
      myth: 'EVMs can be connected via Wi-Fi or Bluetooth to alter counting tallies remotely.',
      fact: 'EVMs are standalone electronic devices with no wireless receivers, no internet chips, no SIM slots, and one-time programmable microcontrollers burnt at manufacturing.',
      whyItMatters: 'Total physical and digital isolation prevents external hacking or network interference.'
    },
    integrityMeasures: [
      'Unique serialized security seals signed by all political parties before and after voting.',
      'Complete round-by-round tally sheets signed by party counting agents after every round.'
    ]
  }
];

export const POLLING_STATION_STEPS: PollingStationStep[] = [
  {
    step: 1,
    officerTitle: 'First Polling Officer',
    location: 'Desk 1 - Verification Station',
    actionTitle: 'Identity & Electoral Roll Verification',
    voterInstructions: 'Step up and state your name and family name clearly. Present your official photo ID (such as Voter Card, Passport, Driver\'s License, or State ID).',
    officialProtocol: 'The officer checks your identity against the marked copy of the electoral roll. They read your name aloud so political agents can hear and verify, then place a red underline across your roll entry.',
    securityFeature: 'Double verification ensures no duplicate voter or impersonator can claim your ballot slot.',
    icon: 'Search',
    badge: 'Step 1 of 4'
  },
  {
    step: 2,
    officerTitle: 'Second Polling Officer',
    location: 'Desk 2 - Inking & Registry',
    actionTitle: 'Indelible Ink & Voter Register Signature',
    voterInstructions: 'Hold out your left hand. The officer will apply indelible silver-nitrate ink on your left forefinger, and you sign or place your thumbprint in the official register.',
    officialProtocol: 'The officer inspects your left forefinger for prior marks, applies ink with a swab running from nail to skin, records your serial number in Register Form 17A, and hands you a serialized Voter Slip.',
    securityFeature: 'Indelible ink cannot be washed off with soap, solvents, or alcohol for weeks, making double-voting physically impossible.',
    icon: 'Fingerprint',
    badge: 'Step 2 of 4'
  },
  {
    step: 3,
    officerTitle: 'Third Polling Officer',
    location: 'Desk 3 - Ballot Controller',
    actionTitle: 'Surrender Slip & Machine Activation',
    voterInstructions: 'Hand over your small paper Voter Slip and show your freshly inked finger to the officer before walking toward the private voting compartment.',
    officialProtocol: 'The officer verifies the ink mark on your finger, collects your slip, places it in a locked paper container, and presses the "BALLOT" button on the EVM Control Unit.',
    securityFeature: 'The machine is unlocked for strictly ONE vote only. No one can press twice or vote consecutively without authorization.',
    icon: 'SlidersHorizontal',
    badge: 'Step 3 of 4'
  },
  {
    step: 4,
    officerTitle: 'Voting Compartment (Private Booth)',
    location: 'Inside Secluded Voting Enclosure',
    actionTitle: 'Cast Confidential Vote on EVM & VVPAT',
    voterInstructions: 'Step into the private screen. Look at the candidate list, find your preferred candidate or NOTA, press the blue button once. Look at the VVPAT glass window!',
    officialProtocol: 'Upon pressing, the red LED light glows beside your candidate, a loud confirmation audio BEEP sounds, and the VVPAT paper slip displays candidate name and symbol for 7 seconds before dropping into the sealed drop box.',
    securityFeature: 'Ballot secrecy is absolute: high barrier screens prevent any line of sight. VVPAT creates a physical, tamper-proof paper trail.',
    icon: 'Vote',
    badge: 'Final Step'
  }
];

export const JARGON_DICTIONARY: JargonTerm[] = [
  {
    id: 'vvpat',
    term: 'VVPAT (Voter Verifiable Paper Audit Trail)',
    category: 'Integrity',
    shortDefinition: 'An independent printer attached to EVMs that prints a paper slip verifying your vote.',
    inSimpleWords: 'Think of it as a transparent receipt printer. When you vote, you get to see a printed slip through a glass window for 7 seconds showing whom you voted for, before it automatically drops into a locked box.',
    realWorldExample: 'If there is ever any legal dispute or recount, the election commission opens the sealed VVPAT box and counts these paper slips by hand.',
    faq: 'Can I take the VVPAT slip home? No. To protect secret ballot laws and prevent vote-buying, the slip must stay in the sealed box.'
  },
  {
    id: 'mcc',
    term: 'Model Code of Conduct (MCC)',
    category: 'Legal',
    shortDefinition: 'A set of ethical rules that take effect the moment election dates are announced.',
    inSimpleWords: 'A fair-play rulebook for politicians. It prevents the ruling party from using government money, state cars, or announcing last-minute handouts to buy public votes.',
    realWorldExample: 'Ministers cannot combine official government inspection tours with campaign rallies, nor can they use public funds to run partisan newspaper ads.',
    faq: 'When does it end? The MCC stays in place from the announcement date until the final election results are certified.'
  },
  {
    id: 'nota',
    term: 'NOTA (None Of The Above)',
    category: 'Voting Rights',
    shortDefinition: 'A ballot option allowing a citizen to reject all contesting candidates.',
    inSimpleWords: 'A button on the voting machine that lets you say: "I came to vote, but none of these candidates meet my standards," without having your ballot cast fraudulently by anyone else.',
    realWorldExample: 'If a voter feels all four candidates in their district are corrupt, pressing NOTA officially records their active dissent on the electoral record.',
    faq: 'What if NOTA gets the highest votes? In most systems, the candidate with the highest non-NOTA votes still wins, but high NOTA numbers send a powerful political signal.'
  },
  {
    id: 'silence-period',
    term: '48-Hour Campaign Silence Period',
    category: 'Procedure',
    shortDefinition: 'A mandatory blackout on all campaign rallies and broadcasts 48 hours before voting ends.',
    inSimpleWords: 'A cool-off period. 48 hours before the voting booths close, all loudspeakers, roadshows, and political television commercials must stop.',
    realWorldExample: 'Candidates cannot hold mega-rallies or blast campaign songs on the street on the evening before election day.',
    faq: 'Why does this exist? It gives citizens peace of mind to think clearly without continuous noise, pressure, or last-minute smear campaigns.'
  },
  {
    id: 'tendered-vote',
    term: 'Tendered Ballot (Rule 49P / Section 49M)',
    category: 'Voting Rights',
    shortDefinition: 'A special ballot given to a genuine voter if an imposter already voted in their name.',
    inSimpleWords: 'If you walk into the booth and the officer says, "Someone already voted as you!", don\'t leave! You prove your real identity, and the Presiding Officer gives you a special numbered ballot paper.',
    realWorldExample: 'Jane arrives at 2 PM. An impersonator used a fake slip at 10 AM. Jane proves her identity with her passport. She marks a tendered ballot, which is sealed in a special envelope.',
    faq: 'Are tendered votes counted? They are kept in sealed custody and counted by a judge if the election margin is narrower than the number of tendered votes.'
  },
  {
    id: 'fptp',
    term: 'First-Past-The-Post (FPTP)',
    category: 'System',
    shortDefinition: 'An electoral system where the candidate with the most votes wins, even without an absolute majority.',
    inSimpleWords: 'Like a 100m sprint: the runner who crosses the line first wins. A candidate doesn\'t need 50% of all votes; they just need one more vote than their closest rival.',
    realWorldExample: 'If Candidate A gets 35%, Candidate B gets 33%, and Candidate C gets 32%, Candidate A wins the seat despite 65% voting for others.',
    faq: 'What is the alternative? Proportional representation, where parliament seats match the total percentage of votes a party earns across the nation.'
  },
  {
    id: 'delimitation',
    term: 'Delimitation / Redistricting',
    category: 'System',
    shortDefinition: 'Redrawing electoral constituency boundaries to maintain equal population balance.',
    inSimpleWords: 'As cities grow and rural areas change, election borders are redrawn so that each elected representative speaks for roughly the same number of citizens.',
    realWorldExample: 'If a suburb grows from 50,000 to 300,000 people over 15 years, a delimitation commission splits it into multiple seats so their votes carry equal weight.',
    faq: 'Who does it? An independent judicial commission to avoid partisan "gerrymandering".'
  },
  {
    id: 'strongroom',
    term: 'EVM / Ballot Strongroom',
    category: 'Integrity',
    shortDefinition: 'A high-security, double-locked vault where polled voting machines are guarded until counting day.',
    inSimpleWords: 'A maximum-security vault. Once voting finishes, all machines are sealed with wax and unique serial locks, stored in a guarded room with CCTV monitors watched 24/7 by all parties.',
    realWorldExample: 'Party representatives often pitch tents outside the strongroom perimeter to monitor live CCTV feeds of the doors around the clock.',
    faq: 'Who holds the keys? The Returning Officer and an independent magistrate, accompanied by security officers.'
  }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    dayOffset: 'T - 45 Days',
    phase: 'Announcement',
    title: 'Gazette Notification & MCC Trigger',
    description: 'The Election Commission formally publishes election dates. The Model Code of Conduct instantly freezes all discretionary government expenditures.',
    voterTask: 'Check your voter registration status on the official portal before registration rolls close.',
    isCrucial: true
  },
  {
    dayOffset: 'T - 35 Days',
    phase: 'Nomination',
    title: 'Candidate Nominations Deadline',
    description: 'All candidates must file paperwork, post security deposits, and upload notarized background affidavits.',
    voterTask: 'View the preliminary list of registered contenders in your area.',
    isCrucial: false
  },
  {
    dayOffset: 'T - 33 Days',
    phase: 'Scrutiny',
    title: 'Public Scrutiny of Nominations',
    description: 'Returning officers examine nomination papers under open observation; bogus or disqualified filings are eliminated.',
    voterTask: 'Read candidate criminal background disclosures and asset declarations published online.',
    isCrucial: false
  },
  {
    dayOffset: 'T - 31 Days',
    phase: 'Nomination',
    title: 'Withdrawal Deadline & Symbol Allocation',
    description: 'Candidates can voluntarily withdraw. Final ballot order and official election symbols are locked in.',
    voterTask: 'Learn your candidate names and symbols; locate your assigned polling station number.',
    isCrucial: false
  },
  {
    dayOffset: 'T - 30 to T - 2 Days',
    phase: 'Campaign',
    title: 'Official Campaigning Window',
    description: 'Public debates, door-to-door campaigning, debates, and manifesto releases. Campaign finance monitors audit daily spending.',
    voterTask: 'Compare manifestos on health, jobs, infrastructure, and education. Fact-check online viral claims.',
    isCrucial: false
  },
  {
    dayOffset: 'T - 48 Hours',
    phase: 'Silence',
    title: 'Mandatory Campaign Silence Period',
    description: 'Loudspeakers, political broadcasts, rallies, and opinion polls are banned by law.',
    voterTask: 'Gather your approved photo ID; double-check polling station address and transport.',
    isCrucial: true
  },
  {
    dayOffset: 'Day 0 (T - 0)',
    phase: 'Voting',
    title: 'Polling Day (7:00 AM - 6:00 PM)',
    description: 'Mock poll at 5:30 AM with party agents. Voting booths open. Citizens cast their secret ballots on EVM + VVPAT.',
    voterTask: 'Go vote early! Bring photo ID. Turn off mobile phone inside the booth. Check VVPAT slip.',
    isCrucial: true
  },
  {
    dayOffset: 'Day + 3 to + 5',
    phase: 'Counting',
    title: 'Vote Counting & Official Certification',
    description: 'Strongroom seals broken before candidate agents. Postal ballots counted first, followed by EVMs. VVPAT slips cross-checked.',
    voterTask: 'Follow live tally from official election website; celebrate democracy with peace and respect.',
    isCrucial: true
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Suppose you arrive at the polling booth on Election Day, but realize you left your physical Voter ID (EPIC) card at home. What can you do?',
    scenario: 'You are at your assigned polling booth, but only have your Driver’s License or Passport with you.',
    options: [
      'You are immediately turned away and cannot vote.',
      'You can vote as long as your name is in the electoral roll and you show any valid government photo ID.',
      'You must pay a penalty fee to get a temporary voter card.',
      'You can only vote after 6:00 PM if all other voters agree.'
    ],
    correctIndex: 1,
    explanation: 'As long as your name is on the official Electoral Roll, the Election Commission allows multiple alternative government photo IDs (Passport, Driving License, Aadhaar, State Employee ID, PAN card, etc.) to establish identity!',
    category: 'Voter Identification',
    badgeEarned: 'Informed Voter'
  },
  {
    id: 2,
    question: 'When you cast your vote on an Electronic Voting Machine (EVM) with a VVPAT attached, how do you verify your vote was correctly registered?',
    scenario: 'You just pressed the blue button for your candidate.',
    options: [
      'You wait for a paper receipt to print out so you can take it home in your pocket.',
      'A red light glows, a confirmation beep sounds, and the VVPAT paper slip displays your candidate for 7 seconds behind a glass window.',
      'You must tell the Polling Officer your choice so they can write it down.',
      'A text message is automatically sent to your mobile phone.'
    ],
    correctIndex: 1,
    explanation: 'The VVPAT slip is visible for 7 seconds through a transparent lighted window showing the serial number, candidate name, and symbol. It then automatically cuts and drops into a sealed box to maintain complete ballot secrecy.',
    category: 'EVM & VVPAT Integrity',
    badgeEarned: 'Integrity Guardian'
  },
  {
    id: 3,
    question: 'What is the purpose of the 48-hour "Campaign Silence Period" before voting ends?',
    scenario: 'Two days before polling, all loud political campaign rallies suddenly stop.',
    options: [
      'To give government officials a holiday before election day.',
      'To give voters a quiet, peaceful window to reflect and make their decision without loud noise, rallies, or propaganda.',
      'To allow political parties to secretly count advance ballots.',
      'To test all voting machines in local public stadiums.'
    ],
    correctIndex: 1,
    explanation: 'The 48-hour silence period creates a cool-off window free from high-decibel propaganda, hate-speech escalations, and last-minute intimidation, ensuring voters can make their deliberate personal choice calmly.',
    category: 'Election Rules',
    badgeEarned: 'Code of Conduct Scholar'
  },
  {
    id: 4,
    question: 'What should you do if someone has already cast a fraudulent vote under your name when you arrive at the booth?',
    scenario: 'The First Polling Officer finds your name already crossed out on the roll.',
    options: [
      'Accept that you lost your turn and head home.',
      'Demand a "Tendered Ballot" (Rule 49P), prove your identity, and cast your vote on a special sealed paper ballot.',
      'Try to guess who voted for you and ask for their candidate choice.',
      'Take away someone else\'s voter slip.'
    ],
    correctIndex: 1,
    explanation: 'Never walk away! By law, if an imposter voted in your place, you have the right to request a Tendered Ballot Paper from the Presiding Officer after proving your true identity. Your vote is sealed in a special cover for judicial scrutiny.',
    category: 'Voter Rights & Protections',
    badgeEarned: 'Democracy Defender'
  },
  {
    id: 5,
    question: 'Are you legally permitted to take a selfie or photograph your ballot or the voting machine screen inside the voting compartment?',
    scenario: 'You want to post a picture on social media showing which candidate you picked.',
    options: [
      'Yes, it is encouraged to show civic pride on social media.',
      'No. Mobile phones are prohibited inside the booth, and revealing your secret vote violates statutory secrecy of ballot laws.',
      'Yes, as long as you blur the candidate\'s symbol.',
      'Only if the Presiding Officer approves your photograph.'
    ],
    correctIndex: 1,
    explanation: 'Secrecy of the ballot is protected by law. Photographing the EVM or ballot violates Section 128 (Maintenance of Secrecy of Voting). Mobile phones must be turned off or left outside the voting compartment.',
    category: 'Polling Rules',
    badgeEarned: 'Constitutional Master'
  }
];

export const ACCEPTABLE_IDS = [
  { name: 'Voter ID Card (EPIC)', desc: 'Official Electoral Photo Identity Card issued by the Election Commission.' },
  { name: 'Passport', desc: 'Valid national passport proving citizenship and full legal name.' },
  { name: 'Driving License', desc: 'State-issued valid motor vehicle driving license with clear photograph.' },
  { name: 'Aadhaar / National ID Card', desc: 'Government biometric ID card with official QR / photograph.' },
  { name: 'Service Photo Identity Card', desc: 'Issued to employees by Central/State Govts, PSUs, or Public Limited Companies.' },
  { name: 'Bank / Post Office Passbook', desc: 'Passbook containing official account photograph and authorized stamp.' },
  { name: 'PAN Card', desc: 'Official Permanent Account Number tax identification card.' },
  { name: 'Smart Card (NPR / RGI)', desc: 'Smart card issued by the Registrar General of India.' },
  { name: 'Pension Document', desc: 'Official pension payment order containing photo identity.' },
  { name: 'Unique Disability ID (UDID)', desc: 'Issued by Ministry of Social Justice & Empowerment for accessible voting priority.' }
];

export const DEFAULT_VOTER_PLAN_ITEMS = [
  { id: '1', label: 'Verify registration on official electoral roll', description: 'Look up serial number and part number online.', completed: true },
  { id: '2', label: 'Locate designated polling station & booth address', description: 'Check walking distance, wheelchair accessibility, and transport.', completed: false },
  { id: '3', label: 'Prepare approved photo ID document', description: 'Keep Voter ID, Passport, or Driving License ready in wallet.', completed: false },
  { id: '4', label: 'Review candidates & sworn affidavits', description: 'Check education, assets, criminal history, and party manifestos.', completed: false },
  { id: '5', label: 'Set your voting time slot (early morning recommended)', description: 'Beating midday queues ensures a quick, stress-free experience.', completed: false },
  { id: '6', label: 'Remind 3 friends or family members to vote', description: 'Spread democratic awareness to first-time youth and elderly neighbors.', completed: false }
];

export const STATUTORY_RIGHTS: StatutoryRight[] = [
  {
    id: 'queue-rule',
    title: 'The 6:00 PM Queue Rule',
    shortSummary: 'If you are physically in line by closing time, polling MUST stay open until you vote.',
    legalProvision: 'Section 56, Conduct of Elections Rules',
    practicalAction: 'The Presiding Officer counts backwards from the last person in queue at 6:00 PM, distributes numbered slips, and guarantees everyone votes.',
    category: 'Integrity',
    icon: 'Clock'
  },
  {
    id: 'paid-leave',
    title: '100% Paid Holiday from Work',
    shortSummary: 'Every registered employee is statutorily entitled to a paid day off on polling day.',
    legalProvision: 'Section 135B, Representation of the People Act',
    practicalAction: 'No deduction or abatement of wages can be made by any public or private employer. Violations carry financial penalties and prosecution.',
    category: 'Employment',
    icon: 'Briefcase'
  },
  {
    id: 'secrecy-ballot',
    title: 'Constitutional Secrecy of Vote',
    shortSummary: 'Nobody—not police, candidates, party agents, or family—can view your ballot.',
    legalProvision: 'Section 128, Secrecy of Voting Mandate',
    practicalAction: 'The voting compartment is fully enclosed. Taking photos, videos, or selfies of your vote is a punishable offense under criminal law.',
    category: 'Secrecy',
    icon: 'Lock'
  },
  {
    id: 'tendered-ballots',
    title: 'Tendered Ballot Protection',
    shortSummary: 'If an imposter falsely voted in your name, your real vote cannot be rejected.',
    legalProvision: 'Rule 49P, Tendered Votes Procedure',
    practicalAction: 'You prove your identity to the Presiding Officer and cast your vote on a special physical paper ballot that is sealed and preserved for court review.',
    category: 'Remedy',
    icon: 'ShieldAlert'
  },
  {
    id: 'universal-access',
    title: 'Universal Accessibility & Companion Voting',
    shortSummary: 'Braille markings on EVMs, ground-floor ramps, and companion assistance for differently-abled voters.',
    legalProvision: 'Rule 49N, Accessible Voting Rights',
    practicalAction: 'Visually impaired or physically challenged voters may bring an adult companion (aged 18+) to record their vote behind the booth under sworn secrecy.',
    category: 'Accessibility',
    icon: 'HeartHandshake'
  },
  {
    id: 'anti-bribery',
    title: '100-Minute Anti-Corruption Action',
    shortSummary: 'Report cash, alcohol, or illicit inducement distribution anonymously via cVigil.',
    legalProvision: 'Model Code of Conduct & Section 171B IPC',
    practicalAction: 'Any geotagged photo or 2-minute video uploaded triggers a flying squad deployment within 15 minutes and verification within 100 minutes.',
    category: 'Integrity',
    icon: 'AlertTriangle'
  }
];

export const ELECTION_COUNTDOWN_EVENTS = [
  {
    id: 'general',
    name: 'National Parliamentary Election',
    description: 'Electing Members of Parliament across federal constituencies',
    targetDate: '2026-10-24T07:00:00',
    phase: 'Pre-Election Preparation',
    rollCloseDays: 14,
    silenceHours: 48
  },
  {
    id: 'assembly',
    name: 'State Legislative Assembly Election',
    description: 'Electing Members of Legislative Assembly for state governance',
    targetDate: '2026-11-15T07:00:00',
    phase: 'Voter Roll Revision',
    rollCloseDays: 10,
    silenceHours: 48
  },
  {
    id: 'municipal',
    name: 'City Council & Municipal Corporation',
    description: 'Local ward governance, municipal councillors, and mayor election',
    targetDate: '2026-12-05T07:00:00',
    phase: 'Delimitation Complete',
    rollCloseDays: 7,
    silenceHours: 24
  }
];
