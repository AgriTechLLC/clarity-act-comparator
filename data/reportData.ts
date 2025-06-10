import { ReportSectionData } from '../types';

export const reportData: ReportSectionData[] = [
  {
    id: 'executive-summary',
    title: 'I. Executive Summary',
    shortTitle: 'Exec. Summary',
    content: [
      'The "Digital Asset Market Clarity Act of 2025," informally known as the "Clarity Act," represents a significant legislative effort to establish a comprehensive regulatory framework for digital assets within the United States. Its primary purpose is to delineate clear lines of authority between the Securities and Exchange Commission (SEC) and the Commodity Futures Trading Commission (CFTC), define key terms within the digital asset ecosystem, and set forth requirements for market participants involved in the issuance, sale, and intermediation of these novel instruments. This report provides a comparative analysis of the original bill text and two subsequent Amendments in the Nature of a Substitute (ANS) proposed by the House Financial Services Committee (HFSC) and the House Agriculture Committee (HAG), respectively, both reportedly released around June 8th, 2025.',
      'The committee amendments, while sharing the overarching goal of the original bill, introduce several significant modifications. Both the HFSC and HAG versions refine definitions such as "digital commodity" and "decentralized governance system," with the HAG ANS often providing more granular exclusions or conditions. Notably, the HAG ANS introduces a specific "Prohibition on Evasion" for entities attempting to avoid classification as a "digital commodity issuer" and a potential safe harbor for "certain non-controlling blockchain developers", provisions not explicitly mirrored in the HFSC ANS or the original text. Furthermore, the HFSC ANS uniquely proposes a category of "Other tradable assets" under CFTC jurisdiction, potentially offering a pathway for regulating assets that do not fit neatly into existing definitions. Both committees also adjust provisions related to insider sales of digital commodities, with HAG favoring SEC rulemaking for setting percentage limits rather than hardcoding them.',
      'The top points of divergence between the HFSC and HAG versions often reflect the traditional purviews of these committees. While both generally agree on the SEC\'s authority over "investment contract assets" and the CFTC\'s jurisdiction over "digital commodity" spot markets, nuances emerge in the application of anti-fraud provisions and specific compliance obligations. For instance, the HAG ANS includes a direct prohibition on manipulative devices for all digital commodity and stablecoin transactions under the SEC\'s purview, whereas the HFSC ANS and original bill tend to apply existing SEC anti-fraud rules. Additionally, the HAG ANS introduces a specific requirement for SEC-registered brokers and dealers to provide disclosures regarding the treatment of customer digital assets in insolvency proceedings, a distinct investor protection measure. The HFSC ANS, on the other hand, proposes a slightly faster timeline for the implementation of certain titles.'
    ],
    relatedLinks: [
      { path: 'conclusion-outlook', linkText: 'Read the Conclusion & Outlook' },
      { path: 'detailed-analysis/foundational-definitions', linkText: 'Review Foundational Definitions' },
      { path: 'comparison-table-summary', linkText: 'View Detailed Comparison Table Summary' }
    ],
    externalLegislationLinks: [
      { url: 'https://docs.house.gov/meetings/BA/BA00/20250610/118373/BILLS-119-HR3633-H001072-Amdt-4.pdf', label: 'HFSC ANS - Clarity Act (PDF)'},
      { url: 'https://docs.house.gov/meetings/AG/AG00/20250610/118382/BILLS-119pih-ANStoHR3633offeredbyChairmanThompsonofPennsylvania-U1.pdf', label: 'House Ag ANS - Clarity Act (PDF)'}
    ]
  },
  {
    id: 'detailed-analysis',
    title: 'II. Detailed Comparative Analysis of the "Clarity Act" Versions',
    shortTitle: 'Analysis', // Changed for brevity
    content: [
      'This section provides a thematic narrative analysis of the substantive changes and differences across the Original Bill, the House Financial Services Committee Amendment in the Nature of a Substitute (HFSC ANS), and the House Agriculture Committee Amendment in the Nature of a Substitute (HAG ANS).'
    ],
    subsections: [
      {
        id: 'foundational-definitions',
        title: 'A. Foundational Definitions',
        shortTitle: 'Definitions',
        content: [
          'The definitions established in Title I of the bills are foundational to the entire regulatory framework, dictating the scope of agency jurisdiction and the application of subsequent regulatory requirements.',
        ],
        relatedLinks: [
          { path: 'detailed-analysis/foundational-definitions/digital-commodity-def', linkText: 'Focus on "Digital Commodity" Definition' }
        ],
        subsections: [
          {
            id: 'digital-asset-def',
            title: '"Digital Asset"',
            shortTitle: 'Digital Asset',
            content: [
              'The term "digital asset" serves as the foundational definition from which all other digital asset categories derive. This broad definition is intentionally technology-neutral to accommodate future innovations in distributed ledger technology.',
              'Key components of the definition include: (1) Digital representation of value - distinguishing from physical assets, (2) Cryptographically-secured - ensuring integrity and authenticity, (3) Distributed ledger or similar technology - allowing for various blockchain and DLT implementations.'
            ],
            comparison: {
              original: 'All three versions—Original Bill [1, Sec. 101, amending Sec 2(a) of Securities Act, p. 6], HFSC ANS 1, and HAG ANS 1—provide an identical high-level definition for "digital asset": "any digital representation of value which is recorded on a cryptographically-secured distributed ledger or other similar technology."',
              hfsc: 'Identical high-level definition as Original Bill and HAG ANS. No variations in the core definition, maintaining consistency across committee versions.',
              hag: 'Identical high-level definition as Original Bill and HFSC ANS. The unanimity suggests strong consensus on this foundational definition.',
              keyDifferences: 'Complete consistency across all versions indicates a shared baseline understanding. The regulatory differentiation occurs with more specific categories of digital assets (digital commodities, investment contract assets, etc.) rather than the umbrella term.',
            },
            relatedLinks: [
              { path: 'detailed-analysis/foundational-definitions/digital-commodity-def', linkText: 'See how "Digital Commodity" builds on this definition' },
              { path: 'detailed-analysis/foundational-definitions/investment-contract-asset-def', linkText: 'Compare with "Investment Contract Asset" definition' }
            ]
          },
          {
            id: 'digital-commodity-def',
            title: '"Digital Commodity"',
            shortTitle: 'Digital Commodity',
            comparison: {
              original: 'This definition is critical for delineating CFTC jurisdiction. It is introduced by amending the Commodity Exchange Act (CEA) in Section 103 of each bill [Original Bill: 1, p. 16, new CEA Sec 1a(16)(F); HFSC ANS: 1, Sec. 103, p. 20, new CEA Sec 1a(16)(F); HAG ANS: 1, Sec. 103, p. 21, new CEA Sec 1a(16)(F)]. While the general concept of a digital asset intrinsically linked to a blockchain system whose value is derived from that system is common, the "Exclusion" sub-clauses reveal important distinctions.',
              hfsc: 'Similar conceptual basis to Original Bill. "Exclusion" sub-clauses are important. Specific details on exclusions for securities may vary from HAG.',
              hag: 'The HAG ANS 1 provides the most detailed exclusions. For instance, its exclusion for "Security" specifies that the term "digital commodity" does not include a note, investment contract, or certificate of interest or participation in any profit-sharing agreement that "represents or gives the holder an ownership interest or other interest in the revenues, profits, obligations, debts, assets, or assets or debts to be acquired of the issuer of the digital asset or another person (other than a decentralized governance system)" or makes the holder a creditor. This level of granularity, particularly the parenthetical exclusion of decentralized governance systems from being the "issuer" in this context, appears more specific than in the Original Bill 1 or HFSC ANS.1 Such detailed exclusions by the Agriculture Committee may be an effort to more definitively establish the boundaries for assets falling under CFTC oversight, thereby minimizing jurisdictional ambiguity with the SEC. A more precise definition of what is not a security (and thus potentially a commodity) is central to the Act\'s purpose.',
              keyDifferences: 'HAG ANS provides more detailed exclusions, especially regarding what is NOT a "digital commodity" (i.e., what remains a security), aiming for clearer boundaries with SEC jurisdiction. The parenthetical exclusion of DGS as issuer is a key HAG distinction.',
            },
             relatedLinks: [
              { path: 'comparison-table-summary', linkText: 'See how this definition is compared in the table (Sec. 103)'}
            ]
          },
          {
            id: 'permitted-payment-stablecoin-def',
            title: '"Permitted Payment Stablecoin"',
            shortTitle: 'Stablecoin',
            content: [
              'Permitted payment stablecoins represent a special category of digital assets designed to maintain price stability and serve as a medium of exchange. The definition establishes clear criteria that distinguish these assets from other digital commodities or securities.',
              'Key requirements include: (1) Primary use as means of payment or settlement, (2) Denomination in legal tender of any country, (3) Issuer subject to state or federal regulatory oversight, (4) Obligation to convert/redeem at stable value, (5) Not itself legal tender or bank deposit.'
            ],
            comparison: {
              original: 'The definition of "permitted payment stablecoin" is largely consistent across the Original Bill 1, HFSC ANS 1, and HAG ANS.1 All three versions define it based on its use as a means of payment/settlement, denomination in a national currency, its issuer being subject to state or federal regulatory authority, the issuer\'s obligation to redeem or maintain a stable value, and specific exclusions (e.g., not being a national currency, certain investment company securities, or traditional bank deposits/accounts).',
              hfsc: 'Definition remains consistent with Original Bill and HAG ANS. No substantive changes to the core criteria or exclusions.',
              hag: 'Definition remains consistent with Original Bill and HFSC ANS. The alignment reflects shared understanding of stablecoin regulation needs.',
              keyDifferences: 'Complete uniformity across all versions suggests strong consensus on stablecoin characteristics. This consistency is notable given the complexity of stablecoin regulation and indicates agreement on treating payment stablecoins as a distinct regulatory category.',
            },
            tableData: [
              {
                id: 'stablecoin-criteria',
                provision: 'Core Criteria',
                originalSummary: 'Payment/settlement use, national currency denomination, regulated issuer, redemption obligation',
                hfscAnalysis: 'Identical criteria maintained',
                hagAnalysis: 'Identical criteria maintained',
                keyDifferencesHfscVsHag: 'No differences - complete alignment'
              },
              {
                id: 'stablecoin-exclusions',
                provision: 'Exclusions',
                originalSummary: 'Not legal tender, not investment company security, not bank deposit',
                hfscAnalysis: 'Same exclusions preserved',
                hagAnalysis: 'Same exclusions preserved',
                keyDifferencesHfscVsHag: 'No differences - unified approach'
              }
            ]
          },
          {
            id: 'investment-contract-asset-def',
            title: '"Investment Contract Asset"',
            shortTitle: 'Investment Contract',
            content: [
              'Investment contract assets represent digital assets that retain characteristics of securities under the Howey test. This definition is crucial for determining SEC jurisdiction over certain digital assets.',
              'The definition encompasses digital assets sold pursuant to investment contracts, including those that may transition to commodity status upon blockchain maturity. Key factors include: reliance on efforts of others, expectation of profits, and common enterprise elements.'
            ],
            comparison: {
              original: 'Defines investment contract assets as digital assets that are investment contracts under securities law, with provisions for transition to commodity status when associated blockchain systems mature.',
              hfsc: 'Maintains similar definition with slight variations in language regarding the transition provisions and timing requirements.',
              hag: 'Includes additional clarity on what constitutes "efforts of others" and provides more specific criteria for determining when an asset no longer qualifies as an investment contract.',
              keyDifferences: 'HAG version provides more granular guidance on the securities analysis, potentially reducing ambiguity in classification. HFSC focuses more on procedural aspects of transition.'
            }
          },
          {
            id: 'decentralized-governance-system-def',
            title: '"Decentralized Governance System"',
            shortTitle: 'DGS',
            content: [
              'The decentralized governance system (DGS) definition addresses how blockchain networks are governed without traditional corporate structures. This definition is critical for determining regulatory obligations and exemptions.',
              'Key elements include: (1) System of rules encoded in smart contracts or protocols, (2) Participation by digital asset holders in governance decisions, (3) Absence of central controlling authority, (4) Transparent and deterministic operation.'
            ],
            comparison: {
              original: 'Basic definition focusing on automated governance through smart contracts and token holder participation.',
              hfsc: 'Similar to original with additional language on "material decisions" and voting mechanisms.',
              hag: 'Most comprehensive definition, adding "acting pursuant to an agreement to act in concert" for groups of persons, and specific provisions for legal entity participation. Includes more detailed criteria for what constitutes decentralized control.',
              keyDifferences: [
                'HAG provides the most detailed framework for identifying DGS structures',
                'HAG\'s "agreement to act in concert" language could capture more informal governance arrangements',
                'HFSC focuses on voting mechanics while HAG emphasizes control structures'
              ]
            }
          },
          {
            id: 'digital-commodity-issuer-def',
            title: '"Digital Commodity Issuer"',
            shortTitle: 'Issuer',
            content: [
              'The digital commodity issuer definition determines which entities have disclosure and compliance obligations when creating or substantially developing digital commodities.',
              'This definition is particularly important for: (1) Determining registration requirements, (2) Establishing disclosure obligations, (3) Setting trading restrictions for insiders, (4) Defining liability for violations.'
            ],
            comparison: {
              original: 'Person who creates, issues, or substantially develops a digital commodity, with basic safe harbors for certain service providers.',
              hfsc: 'Similar to original with clarifications on "substantial development" meaning significant contribution to functionality or value.',
              hag: [
                'Most comprehensive version including a specific "Prohibition on Evasion" provision',
                'States that persons cannot avoid issuer status through "any plan, scheme, or artifice"',
                'Includes detailed examples of what constitutes substantial development',
                'Provides clearer safe harbors for infrastructure providers'
              ],
              keyDifferences: [
                'HAG\'s anti-evasion provision is unique and significantly strengthens enforcement',
                'HAG provides most detailed guidance on what activities trigger issuer status',
                'HFSC offers middle ground between original\'s simplicity and HAG\'s comprehensiveness'
              ]
            }
          },
          {
            id: 'blockchain-system-def',
            title: '"Blockchain System"',
            shortTitle: 'Blockchain',
            content: [
              'The blockchain system definition establishes the technical parameters for what constitutes a qualifying distributed ledger technology under the Act. This definition is technology-neutral while ensuring certain security and decentralization standards.',
              'Core requirements include: (1) Cryptographic security mechanisms, (2) Distributed consensus protocol, (3) Immutable transaction history, (4) Open participation (for public chains) or defined participation (for permissioned chains), (5) Programmable functionality through smart contracts.'
            ],
            comparison: {
              original: 'General definition covering distributed ledgers using cryptographic validation and consensus mechanisms.',
              hfsc: 'Adds specific technical requirements including minimum node distribution and uptime requirements.',
              hag: 'Most technical definition including specific consensus algorithm categories and security audit requirements.',
              keyDifferences: 'HAG provides most prescriptive technical standards while HFSC balances technical requirements with flexibility.'
            }
          },
          {
            id: 'mature-blockchain-system-def',
            title: '"Mature Blockchain System"',
            shortTitle: 'Mature Blockchain',
            content: [
              'The mature blockchain system designation is crucial as it triggers the potential transition of investment contract assets to digital commodity status. This definition sets objective criteria for blockchain maturity.',
              'Maturity criteria include: (1) Decentralization metrics (node distribution, mining/validation diversity), (2) Functional completeness of the network, (3) Security track record (time without major incidents), (4) Adoption metrics (users, transaction volume), (5) Governance decentralization.'
            ],
            comparison: {
              original: [
                'Five core criteria for maturity: decentralization, functionality, security history, adoption, and governance',
                'SEC certification process with 60-day determination period',
                'Appeals process through federal courts'
              ],
              hfsc: [
                'Maintains five criteria with additional quantitative metrics',
                'Adds "substantial compliance" alternative for networks meeting 4 of 5 criteria',
                'Expedited review process for previously denied applications'
              ],
              hag: [
                'Most detailed criteria including specific thresholds (e.g., minimum 1000 nodes, 5+ independent core developers)',
                'Includes safe harbor for networks operating for 3+ years without enforcement actions',
                'Automatic certification for networks meeting all objective criteria'
              ],
              keyDifferences: [
                'HAG provides most specific quantitative thresholds',
                'HFSC offers flexibility with "substantial compliance" option',
                'HAG includes automatic certification pathway not in other versions'
              ]
            }
          },
          {
            id: 'digital-commodity-exchange-def',
            title: '"Digital Commodity Exchange"',
            shortTitle: 'DCE',
            content: [
              'Digital commodity exchanges represent a new category of CFTC-regulated entities specifically designed for spot trading of digital commodities. This definition establishes which platforms must register and comply with CFTC oversight.',
              'Key elements include: (1) Facilitation of digital commodity trading, (2) Order matching or market making functions, (3) Custody or control of customer assets, (4) Price discovery mechanisms, (5) Direct or indirect access to US persons.'
            ],
            comparison: {
              original: 'Broad definition covering any platform facilitating digital commodity trading with US persons.',
              hfsc: 'Adds specific volume thresholds ($50M annual) and user counts (500+ US users) for registration requirements.',
              hag: 'Includes detailed carve-outs for pure software providers and non-custodial protocols, with specific DeFi considerations.',
              keyDifferences: 'HAG provides clearest exemptions for decentralized protocols while HFSC uses objective thresholds.'
            }
          },
          {
            id: 'control-person-def',
            title: '"Control Person"',
            shortTitle: 'Control Person',
            content: [
              'The control person definition determines who has sufficient influence over a digital asset project to warrant regulatory obligations and potential liability. This is particularly important for decentralized projects.',
              'Control indicators include: (1) Ownership of 20%+ of governance tokens, (2) Ability to unilaterally modify core protocol parameters, (3) Control over upgrade mechanisms, (4) Possession of admin keys or special privileges, (5) Contractual rights to direct development.'
            ],
            comparison: {
              original: 'Traditional control definition adapted for digital assets focusing on voting power and technical control.',
              hfsc: 'Adds specific percentages for token ownership (20%) and clarifies technical control mechanisms.',
              hag: 'Most comprehensive including "negative control" provisions and aggregation rules for related parties. Uniquely addresses time-locked tokens and vesting schedules.',
              keyDifferences: 'HAG provides most nuanced approach to control in DeFi context, HFSC offers clearer bright-line tests.'
            }
          },
        ],
      },
      {
        id: 'definitions-comparison-table',
        title: 'Comprehensive Definitions Comparison Table',
        shortTitle: 'Definitions Table',
        content: [
          'This comprehensive table provides a detailed comparison of how each key term is defined across the three versions of the Clarity Act, highlighting the nuances and differences that could significantly impact implementation and compliance.'
        ],
        tableData: [
          {
            id: 'def-digital-asset',
            provision: 'Digital Asset',
            originalSummary: 'Any digital representation of value which is recorded on a cryptographically-secured distributed ledger or other similar technology',
            hfscAnalysis: 'Identical definition - no changes from original',
            hagAnalysis: 'Identical definition - no changes from original',
            keyDifferencesHfscVsHag: 'Complete uniformity across all versions'
          },
          {
            id: 'def-digital-commodity',
            provision: 'Digital Commodity',
            originalSummary: 'Digital asset that is not a security, with basic exclusions for securities and banking products',
            hfscAnalysis: 'Similar core definition with clarified exclusions for "security" category, maintains general approach',
            hagAnalysis: 'Most detailed exclusions specifying that securities include assets representing ownership/profit interests (except in DGS), creditor relationships, and specific carve-outs',
            keyDifferencesHfscVsHag: 'HAG provides significantly more granular exclusions, particularly the DGS exception for ownership interests'
          },
          {
            id: 'def-investment-contract-asset',
            provision: 'Investment Contract Asset',
            originalSummary: 'Digital asset sold pursuant to an investment contract, with transition provisions upon blockchain maturity',
            hfscAnalysis: 'Adds procedural clarifications for transition timing and notification requirements',
            hagAnalysis: 'Includes detailed criteria for "efforts of others" analysis and specific safe harbors during transition',
            keyDifferencesHfscVsHag: 'HAG focuses on substantive Howey test application, HFSC on procedural aspects'
          },
          {
            id: 'def-blockchain-system',
            provision: 'Blockchain System',
            originalSummary: 'Software and network of participants that process transactions and maintain distributed ledger',
            hfscAnalysis: 'Adds minimum technical requirements: 100+ nodes, 95% uptime, geographic distribution',
            hagAnalysis: 'Most technical: specifies consensus types (PoW, PoS, etc.), requires security audits, defines participation models',
            keyDifferencesHfscVsHag: 'HAG emphasizes security standards, HFSC focuses on decentralization metrics'
          },
          {
            id: 'def-mature-blockchain',
            provision: 'Mature Blockchain System',
            originalSummary: 'Blockchain meeting 5 criteria: decentralized, functional, secure, adopted, and governance-decentralized',
            hfscAnalysis: 'Adds "substantial compliance" option (4/5 criteria), provides ranges for metrics rather than hard numbers',
            hagAnalysis: 'Specific thresholds: 1000+ nodes, 5+ core developers, 3-year track record, automatic certification if all met',
            keyDifferencesHfscVsHag: 'HAG provides objective thresholds and automatic qualification, HFSC offers more flexibility'
          },
          {
            id: 'def-dgs',
            provision: 'Decentralized Governance System',
            originalSummary: 'System where blockchain decisions are made through distributed participant voting',
            hfscAnalysis: 'Focuses on voting mechanics and "material decision" definitions',
            hagAnalysis: 'Adds "agreement to act in concert" language, addresses informal coordination, specifies entity participation',
            keyDifferencesHfscVsHag: 'HAG captures broader governance arrangements including informal coordination'
          },
          {
            id: 'def-control-person',
            provision: 'Control Person',
            originalSummary: 'Person with power to direct management/policies through ownership, contract, or otherwise',
            hfscAnalysis: '20% token ownership threshold, includes technical control (admin keys, upgrade authority)',
            hagAnalysis: 'Same 20% threshold plus aggregation rules, vesting schedule considerations, "negative control" concepts',
            keyDifferencesHfscVsHag: 'HAG addresses complex control structures and related party aggregation'
          },
          {
            id: 'def-digital-commodity-issuer',
            provision: 'Digital Commodity Issuer',
            originalSummary: 'Person who creates, issues, or substantially develops a digital commodity',
            hfscAnalysis: 'Clarifies "substantial development" as significant contribution to functionality or value',
            hagAnalysis: 'Includes anti-evasion provision prohibiting schemes to avoid issuer status, detailed development examples',
            keyDifferencesHfscVsHag: 'HAG\'s anti-evasion clause significantly strengthens enforcement capabilities'
          },
          {
            id: 'def-stablecoin',
            provision: 'Permitted Payment Stablecoin',
            originalSummary: 'Digital asset for payment, pegged to fiat, issued by regulated entity, redeemable at stable value',
            hfscAnalysis: 'Identical requirements and exclusions as original',
            hagAnalysis: 'Identical requirements and exclusions as original',
            keyDifferencesHfscVsHag: 'Complete agreement - reflects consensus on stablecoin regulation'
          },
          {
            id: 'def-digital-commodity-exchange',
            provision: 'Digital Commodity Exchange',
            originalSummary: 'Platform facilitating digital commodity trading for US persons',
            hfscAnalysis: 'Adds thresholds: $50M annual volume OR 500+ US users triggers registration',
            hagAnalysis: 'Detailed exemptions for non-custodial protocols, pure software providers, DeFi considerations',
            keyDifferencesHfscVsHag: 'HFSC uses bright-line tests, HAG provides nuanced DeFi exemptions'
          }
        ]
      },
      {
        id: 'regulatory-jurisdiction',
        title: 'B. Regulatory Jurisdiction and Agency Authority',
        shortTitle: 'Jurisdiction',
        content: ['A central aim of the Clarity Act is to allocate regulatory authority over digital assets between the SEC and the CFTC. Titles III (SEC) and IV (CFTC) of the bills are dedicated to this.'],
        subsections: [
            {
                id: 'sec-authority',
                title: 'SEC Authority (Title III)',
                shortTitle: 'SEC Authority',
                comparison: {
                    original: [
                        'Section 301, "Treatment of digital commodities and permitted payment stablecoins," is consistent across all versions. It amends various foundational securities acts (Securities Act of 1933, Securities Exchange Act of 1934, Investment Advisers Act of 1940, Investment Company Act of 1940, Securities Investor Protection Act of 1970) to explicitly exclude "digital commodity" and "permitted payment stablecoin" from the definition of "security" or "investment contract" under those respective acts. This is a critical step enabling the CFTC\'s jurisdiction over these assets as commodities in their spot markets.',
                        'Section 302, "Anti-fraud authority over permitted payment stablecoins and certain digital commodity transactions," extends SEC anti-fraud powers. The Original Bill and HFSC ANS achieve this by stating that SEC rules under Section 10(b) of the Exchange Act (prohibiting fraud, manipulation, or insider trading) and related judicial precedents apply to permitted payment stablecoin and digital commodity transactions when engaged in by SEC-registered intermediaries (brokers, dealers, ATSs, national securities exchanges).'
                    ],
                    hfsc: [
                        'Section 301 is consistent across all versions, amending foundational securities acts (Securities Act of 1933, Securities Exchange Act of 1934, Investment Advisers Act of 1940, Investment Company Act of 1940, Securities Investor Protection Act of 1970) to explicitly exclude "digital commodity" and "permitted payment stablecoin" from "security" or "investment contract" definitions.',
                        'Section 302 extends SEC anti-fraud powers by stating that SEC rules under Section 10(b) of the Exchange Act and related judicial precedents apply to permitted payment stablecoin and digital commodity transactions by SEC-registered intermediaries.'
                    ],
                    hag: 'Section 301 similar to Original. Section 302, while having similar language, also inserts a new, direct prohibition (new subsection (d) to Section 10 of the Exchange Act) against using manipulative or deceptive devices in connection with the purchase or sale of any permitted payment stablecoin or digital commodity, including through SEC-registered intermediaries. This direct statutory prohibition in the HAG ANS could be interpreted as a more encompassing or assertive application of anti-fraud principles by the SEC in these contexts.',
                    keyDifferences: ['HAG ANS adds a direct statutory prohibition against manipulative devices, potentially a more assertive application of anti-fraud principles by the SEC in these contexts, beyond relying on existing Sec 10(b) rules.']
                },
                subsections: [
                    {
                        id: 'sec-registration-framework',
                        title: 'SEC Registration Framework for Digital Asset Securities',
                        shortTitle: 'SEC Registration',
                        content: [
                            'The Act preserves and clarifies SEC\'s existing registration requirements for digital assets that qualify as securities, while providing tailored provisions for the unique characteristics of blockchain-based securities.',
                            'Key elements include: (1) Form S-1 adaptations for token offerings, (2) Ongoing reporting obligations for investment contract assets, (3) Modified disclosure requirements addressing technical risks, (4) Safe harbors for certain secondary market transactions, (5) Coordination with state blue sky laws.'
                        ],
                        comparison: {
                            original: 'Standard securities registration with minimal blockchain-specific modifications.',
                            hfsc: 'Adds Form S-DIG for digital asset securities with streamlined disclosure for technical aspects.',
                            hag: 'Creates comprehensive digital asset disclosure framework including smart contract audits and tokenomics analysis.',
                            keyDifferences: 'HAG provides most detailed disclosure requirements while HFSC offers more streamlined approach.'
                        }
                    },
                    {
                        id: 'sec-investment-contract-oversight',
                        title: 'Investment Contract Asset Oversight',
                        shortTitle: 'Investment Contracts',
                        content: [
                            'The SEC retains primary oversight of investment contract assets, with specific provisions for their potential transition to commodity status upon blockchain maturity.',
                            'Oversight includes: (1) Initial offering regulation, (2) Ongoing disclosure requirements, (3) Trading venue registration, (4) Market manipulation enforcement, (5) Transition procedures to commodity status.'
                        ],
                        comparison: {
                            original: 'Basic framework applying existing securities laws to investment contract assets.',
                            hfsc: 'Adds specific timelines for maturity determination (60 days) and transition procedures.',
                            hag: 'Most detailed with automatic transition triggers and safe harbor during transition period.',
                            keyDifferences: 'HAG provides most issuer-friendly transition process while maintaining investor protections.'
                        }
                    }
                ]
            },
            {
                id: 'cftc-authority',
                title: 'CFTC Authority (Title IV)',
                shortTitle: 'CFTC Authority',
                content: [
                    'The CFTC\'s expanded authority under the Clarity Act represents a fundamental shift in commodity regulation, extending traditional futures oversight to include spot market jurisdiction for digital commodities.',
                    'Key aspects of CFTC authority include: (1) Exclusive jurisdiction over digital commodity spot markets, (2) Registration and oversight of digital commodity exchanges, (3) Market manipulation and fraud prevention powers, (4) Customer asset protection requirements, (5) Coordination with SEC on mixed transactions.'
                ],
                comparison: {
                    original: [
                        'Section 401, "Commission jurisdiction over digital commodity transactions," is pivotal. All three versions grant CFTC "exclusive jurisdiction" over accounts, agreements, contracts, or transactions involving a contract of sale of a digital commodity in interstate commerce (including cash/spot markets) by CFTC-registered entities or those required to be registered.',
                        'Limitations: This exclusive jurisdiction does not apply to (i) custodial or depository activities for a digital commodity by regulated banking entities, and (ii) an offer or sale of an investment contract involving a digital commodity or a securities offer/sale involving a digital commodity.',
                        '"Mixed digital asset transactions" (digital commodity traded for a security): CFTC\'s exclusive jurisdiction does not apply, but SEC-registered persons engaging in such transactions must open their books and records to the CFTC upon request.',
                        'Permitted payment stablecoins: CFTC has jurisdiction over cash/spot transactions when traded on CFTC-registered entities (treating them as digital commodities for regulatory purposes). However, all three explicitly state CFTC has "NO AUTHORITY OVER PERMITTED PAYMENT STABLECOINS" regarding the operation of the issuer or the stablecoin itself [e.g., Original Bill p.140, Sec 2(c)(2)(G)(iii); HFSC ANS p.124; HAG ANS p.130]. This delineates trading oversight from issuer regulation.'
                    ],
                    hfsc: [
                        'Maintains exclusive jurisdiction framework with identical carve-outs for banking and securities activities',
                        'Adds clarification on "digital commodity exchange" registration requirements',
                        'Includes additional customer protection provisions for segregation of digital assets',
                        'Mixed transaction provisions remain similar with minor procedural adjustments'
                    ],
                    hag: [
                        'Preserves core jurisdictional framework while adding more detailed operational requirements',
                        'Includes specific provisions for agricultural commodity digital tokens',
                        'Enhanced reporting requirements for large traders in digital commodity markets',
                        'More detailed guidance on cross-border transactions and international coordination'
                    ],
                    keyDifferences: [
                        'All versions align on core CFTC spot market jurisdiction',
                        'HAG includes most detailed operational and compliance requirements',
                        'HFSC focuses more on customer protection aspects',
                        'Banking and securities carve-outs remain consistent across all versions'
                    ]
                },
                subsections: [
                    {
                        id: 'cftc-registration-requirements',
                        title: 'Registration Requirements for Digital Commodity Intermediaries',
                        shortTitle: 'Registration',
                        content: [
                            'The Act establishes comprehensive registration requirements for entities operating in digital commodity markets, including exchanges, brokers, dealers, and custodians.',
                            'Registration categories include: (1) Digital Commodity Exchange (DCE), (2) Digital Commodity Broker, (3) Digital Commodity Dealer, (4) Digital Commodity Custodian. Each category has specific operational, financial, and compliance requirements.'
                        ],
                        comparison: {
                            original: 'Basic registration framework with core categories and general requirements.',
                            hfsc: 'Adds specific net capital requirements and operational safeguards for each category.',
                            hag: 'Most detailed requirements including specific examinations, continuing education, and annual compliance certifications.',
                            keyDifferences: 'HAG provides most prescriptive requirements while HFSC focuses on financial safeguards.'
                        }
                    },
                    {
                        id: 'cftc-enforcement-powers',
                        title: 'CFTC Enforcement Powers and Market Oversight',
                        shortTitle: 'Enforcement',
                        content: [
                            'The Act grants CFTC comprehensive enforcement powers over digital commodity markets, including civil penalties, cease and desist authority, and emergency intervention capabilities.',
                            'Enforcement tools include: (1) Market surveillance systems, (2) Position limits and reporting, (3) Anti-manipulation rules, (4) Whistleblower provisions, (5) Coordination with criminal authorities.'
                        ],
                        comparison: {
                            original: 'Standard CFTC enforcement powers adapted for digital commodities.',
                            hfsc: 'Includes enhanced penalties specifically for digital asset violations and faster administrative procedures.',
                            hag: 'Adds specific market manipulation definitions for digital assets and enhanced whistleblower incentives.',
                            keyDifferences: 'HAG provides most detailed anti-manipulation framework while HFSC streamlines enforcement procedures.'
                        }
                    }
                ]
            },
            {
                id: 'jurisdictional-boundaries',
                title: 'Jurisdictional Boundaries and Inter-Agency Coordination',
                shortTitle: 'Boundaries',
                content: [
                    'The Clarity Act establishes clear jurisdictional boundaries between SEC and CFTC oversight, addressing the historic uncertainty that has plagued digital asset regulation.',
                    'Key boundary principles include: (1) SEC retains authority over investment contracts and securities, (2) CFTC gains authority over commodity spot markets, (3) Transition mechanisms for assets that change classification, (4) Shared oversight for mixed transactions, (5) Information sharing requirements.'
                ],
                comparison: {
                    original: 'Basic framework for dividing authority with general coordination requirements.',
                    hfsc: 'Adds specific timelines for inter-agency decisions and dispute resolution procedures.',
                    hag: 'Most detailed coordination framework including mandatory joint rulemakings and regular coordination meetings.',
                    keyDifferences: 'HAG emphasizes ongoing coordination while HFSC focuses on clear decision timelines.'
                },
                tableData: [
                    {
                        id: 'boundary-investment-contracts',
                        provision: 'Investment Contract Assets',
                        originalSummary: 'SEC has exclusive jurisdiction',
                        hfscAnalysis: 'SEC jurisdiction with 60-day determination timeline',
                        hagAnalysis: 'SEC jurisdiction with additional safe harbor provisions',
                        keyDifferencesHfscVsHag: 'HAG provides more issuer protections during determination period'
                    },
                    {
                        id: 'boundary-commodities',
                        provision: 'Digital Commodities (Spot)',
                        originalSummary: 'CFTC has exclusive jurisdiction',
                        hfscAnalysis: 'CFTC jurisdiction with banking carve-outs',
                        hagAnalysis: 'CFTC jurisdiction with detailed exemptions',
                        keyDifferencesHfscVsHag: 'HAG has more granular exemptions for specific activities'
                    },
                    {
                        id: 'boundary-mixed',
                        provision: 'Mixed Transactions',
                        originalSummary: 'Shared oversight with SEC lead',
                        hfscAnalysis: 'SEC lead with CFTC audit rights',
                        hagAnalysis: 'SEC lead with mandatory coordination',
                        keyDifferencesHfscVsHag: 'HAG requires formal coordination agreements'
                    }
                ]
            }
        ]
      },
    ],
  },
  {
    id: 'comparison-table-summary',
    title: 'III. Detailed Comparison Table: Key Provisions (Summary)',
    shortTitle: 'Comparison Table',
    tableData: [
      {
        id: 'sec-101-defs-sa1933',
        provision: 'Sec. 101: Definitions under the Securities Act of 1933',
        originalSummary: 'Amends Sec 2(a) of Securities Act to add new definitions.',
        hfscAnalysis: 'Largely similar definitions for blockchain, digital asset, permitted payment stablecoin, mature blockchain system, investment contract asset. Defines "digital commodity affiliated person" and "digital commodity related person" with specific thresholds.',
        hagAnalysis: 'Largely similar definitions for core terms. "Decentralized Governance System" definition adds "acting pursuant to an agreement to act in concert" for relationship of persons, and slightly different phrasing for legal entities. "Digital Commodity Affiliated Person" excludes acquisitions from a DGS. "Digital Commodity Issuer" definition includes a "Prohibition on Evasion."',
        keyDifferencesHfscVsHag: 'HAG: More nuanced "Decentralized Governance System," DGS exclusion for "Affiliated Person," "Prohibition on Evasion" for "Issuer."',
      },
      {
        id: 'sec-103-defs-cea',
        provision: 'Sec. 103: Definitions under the Commodity Exchange Act',
        originalSummary: 'Amends Sec 1a of CEA to add definitions, notably "digital commodity" with exclusions.',
        hfscAnalysis: 'Defines "digital commodity" with exclusions. Introduces "decentralized finance messaging system" and "decentralized finance trading protocol."',
        hagAnalysis: 'Defines "digital commodity" with very detailed exclusions, particularly for what constitutes a "security" or "security derivative" that is not a digital commodity. Also defines DeFi terms.',
        keyDifferencesHfscVsHag: 'HAG: Appears to have more granular exclusions in the "digital commodity" definition, aiming for greater precision in distinguishing from securities.',
      },
      {
        id: 'sec-106-prov-reg',
        provision: 'Sec. 106: Provisional Registration',
        originalSummary: 'Establishes provisional registration for digital commodity exchanges, brokers, dealers. Details information to be submitted.',
        hfscAnalysis: 'Titled "Registration...; provisional status." Similar provisional registration framework. [p. 46-48 (shorter section in original PDF, referring to HFSC ANS text)]',
        hagAnalysis: 'Establishes provisional registration. Details specific compliance requirements for provisional registrants (statutory disqualifications, books/records, extensive customer disclosures).',
        keyDifferencesHfscVsHag: 'HAG: More explicit and detailed compliance requirements during provisional registration.',
      },
       {
        id: 'sec-110-hag-dev-safe-harbor',
        provision: 'Sec. 110 (HAG only): Treatment of certain non-controlling blockchain developers',
        originalSummary: 'Not present.',
        hfscAnalysis: 'Not present.',
        hagAnalysis: 'Provides that a person is not subject to certain securities laws solely for developing/publishing/deploying blockchain systems or related software/services, unless they are a "control person" or receive certain types of market-dependent compensation.',
        keyDifferencesHfscVsHag: 'Unique to HAG: Potential safe harbor for non-controlling developers.',
      },
      {
        id: 'sec-204-insider-sales',
        provision: 'Sec. 204: Requirements for offers and sales by digital commodity related/affiliated persons',
        originalSummary: 'Amends Securities Act (new Sec 4C). Sets restrictions (holding periods, fixed volume limits of 15%/50% pre-maturity, 8%/25% post-maturity for affiliated) on insider sales.',
        hfscAnalysis: 'Similar to Original. Sets fixed volume limits (15%/50% pre-maturity, 8%/25% post-maturity for affiliated).',
        hagAnalysis: 'Similar structure. For pre-maturity sales, sets ranges (5-20% in 12mo, 30-50% total) subject to SEC rulemaking. For post-maturity affiliated sales, sets range (5-10% of total outstanding) subject to SEC rulemaking.',
        keyDifferencesHfscVsHag: 'HAG: Delegates authority to SEC to set precise percentage limits for insider sales via rulemaking, providing more flexibility than fixed statutory limits in Original/HFSC.',
      },
      {
        id: 'sec-205-mature-blockchain',
        provision: 'Sec. 205: Mature blockchain system requirements',
        originalSummary: 'Amends Exchange Act (new Sec 42). Details certification process and criteria for "mature blockchain system."',
        hfscAnalysis: 'Largely identical to Original regarding certification process and maturity criteria.',
        hagAnalysis: 'Largely identical to Original and HFSC regarding certification process and maturity criteria.',
        keyDifferencesHfscVsHag: 'High degree of similarity across all three versions for this critical section.',
      },
      {
        id: 'sec-302-anti-fraud-stablecoins-dc',
        provision: 'Sec. 302: Anti-fraud authority over permitted payment stablecoins and certain digital commodity transactions',
        originalSummary: 'Extends SEC anti-fraud rules (Sec 10(b) of Exchange Act) and precedents to digital commodities/stablecoins traded by SEC intermediaries.',
        hfscAnalysis: 'Similar to Original.',
        hagAnalysis: 'Similar application of existing rules/precedents but also adds a new, direct statutory prohibition (new Sec 10(d) of Exchange Act) against manipulative/deceptive devices for any digital commodity/stablecoin purchase/sale.',
        keyDifferencesHfscVsHag: 'HAG: Adds a more direct statutory anti-fraud prohibition for SEC oversight.',
      },
      {
        id: 'sec-311-hag-disclosures',
        provision: 'Sec. 311 (HAG only): Broker and dealer disclosures regarding the treatment of assets',
        originalSummary: 'Original Bill Sec 311 is titled "Digital commodity activities that are financial in nature."',
        hfscAnalysis: 'HFSC ANS Sec 311 is titled "Digital commodity activities that are financial in nature."',
        hagAnalysis: 'Requires SEC to issue rules for brokers/dealers to disclose treatment of customer digital assets in insolvency/resolution proceedings.',
        keyDifferencesHfscVsHag: 'Unique to HAG: Specific investor protection disclosure requirement for SEC intermediaries regarding insolvency.',
      },
      {
        id: 'sec-401-cftc-jurisdiction',
        provision: 'Sec. 401: Commission jurisdiction over digital commodity transactions',
        originalSummary: 'Grants CFTC exclusive jurisdiction over digital commodity spot markets with limitations. Addresses mixed digital asset transactions and CFTC authority over stablecoin trading (not issuers).',
        hfscAnalysis: 'Similar to Original.',
        hagAnalysis: 'Similar to Original.',
        keyDifferencesHfscVsHag: 'General alignment on CFTC spot market jurisdiction and limitations.',
      },
      {
        id: 'sec-413-hfsc-other-tradable',
        provision: 'Sec. 413 (HFSC only): Other tradable assets',
        originalSummary: 'Not present (Original Bill Sec. 413 is "Effective date").',
        hfscAnalysis: 'Allows CFTC to designate other digital assets (not clearly commodities or securities) as "tradable assets" regulated as digital commodities on CFTC platforms, with rulemaking for additional obligations.',
        hagAnalysis: 'Not present (HAG ANS Sec. 413 is "Effective date").',
        keyDifferencesHfscVsHag: 'Unique to HFSC: Provides a mechanism for CFTC to regulate novel digital assets.',
      },
      {
        id: 'sec-501-508-innovation',
        provision: 'Sec. 501-508: Findings, SEC/CFTC Modernization, FinHub, LabCFTC, Studies (DeFi, NFT, Literacy, Market Infrastructure)',
        originalSummary: 'Contains these elements.',
        hfscAnalysis: 'Contains these elements.',
        hagAnalysis: 'Contains these elements.',
        keyDifferencesHfscVsHag: 'General alignment on these innovation-focused initiatives.',
      },
      {
        id: 'sec-509-hag-blockchain-payments-study',
        provision: 'Sec. 509 (HAG only): Study on blockchain in payments',
        originalSummary: 'Not present.',
        hfscAnalysis: 'Not present.',
        hagAnalysis: 'Mandates Treasury study on private sector use of blockchain for payments (fraud, costs, efficiency).',
        keyDifferencesHfscVsHag: 'Unique to HAG: Specific study on broader economic applications of blockchain in payments.',
      }
    ],
  },
  {
    id: 'compliance-overview',
    title: 'V. Comprehensive Compliance Obligations Overview',
    shortTitle: 'Compliance',
    content: [
      'This section outlines key compliance obligations anticipated under the "Clarity Act" framework, drawing from provisions across the original bill and its amendments. These obligations impact various market participants, including issuers, exchanges, brokers, and developers.'
    ],
    complianceData: [
      {
        requirementId: 'COMPL-001',
        requirementTitle: 'Digital Commodity Exchange Registration',
        description: [
          'Entities operating as exchanges for digital commodities must register with the CFTC (or SEC if primarily trading investment contract assets).',
          'Provisional registration may be available, followed by full registration requiring adherence to core principles similar to existing commodity exchange regulation (e.g., system safeguards, financial resources, monitoring trading).'
        ],
        responsibleEntities: ['Digital Asset Exchanges', 'Trading Platforms'],
        keyRegulatoryFocus: 'CFTC',
        penaltiesSummary: 'Failure to register can lead to operational shutdown, significant fines, and potential individual liability for operators.',
        sourceSections: 'Sec. 106 (Provisional Registration), Title IV (CFTC Authority)',
        notes: 'HAG ANS specifies more detailed compliance requirements during provisional registration.'
      },
      {
        requirementId: 'COMPL-002',
        requirementTitle: 'Issuer Disclosures for Digital Commodities',
        description: 'Issuers of digital commodities (particularly those not deemed fully decentralized) may need to provide ongoing disclosures regarding the project, its development, tokenomics, and material changes. Specifics may be subject to SEC/CFTC rulemaking.',
        responsibleEntities: ['Digital Commodity Issuers', 'Project Developers'],
        keyRegulatoryFocus: 'Both',
        penaltiesSummary: 'Inadequate or misleading disclosures can result in enforcement actions, fines, and investor lawsuits.',
        sourceSections: 'Implicit from various sections on definitions and anti-fraud.',
        notes: 'The HAG ANS "Prohibition on Evasion" for digital commodity issuer classification is relevant here.'
      },
      {
        requirementId: 'COMPL-003',
        requirementTitle: 'Broker-Dealer and FCM Obligations',
        description: 'Entities acting as brokers or dealers in digital assets (commodities or securities) must register with the appropriate agency (SEC for securities, CFTC for commodities) and adhere to applicable rules regarding customer protection, capital requirements, and record-keeping.',
        responsibleEntities: ['Digital Asset Brokers', 'Dealers', 'Futures Commission Merchants (FCMs)'],
        keyRegulatoryFocus: 'Both',
        penaltiesSummary: 'Operating without registration or violating conduct rules can lead to license revocation, fines, and disgorgement of profits.',
        sourceSections: 'Sec. 106, Title III (SEC), Title IV (CFTC)'
      },
      {
        requirementId: 'COMPL-004',
        requirementTitle: 'Anti-Fraud and Anti-Manipulation Provisions',
        description: 'All market participants are subject to general and specific anti-fraud and anti-manipulation provisions enforced by both the SEC and CFTC. This includes prohibitions on deceptive devices, insider trading (as applicable), and wash trading.',
        responsibleEntities: ['All Market Participants'],
        keyRegulatoryFocus: 'Both',
        penaltiesSummary: 'Severe penalties including fines, injunctions, industry bars, and potential criminal charges.',
        sourceSections: 'Sec. 302 (SEC Anti-Fraud), General CEA and Securities Act provisions.',
        notes: 'HAG ANS includes a direct statutory prohibition against manipulative devices for stablecoins and digital commodities handled by SEC intermediaries (new Sec 10(d) Exchange Act).'
      },
      {
        requirementId: 'COMPL-005',
        requirementTitle: 'Permitted Payment Stablecoin Issuer Requirements',
        description: 'Issuers of permitted payment stablecoins must meet specific criteria, including maintaining adequate reserves, establishing redemption procedures, and being subject to oversight by state or federal banking authorities or equivalent.',
        responsibleEntities: ['Stablecoin Issuers'],
        keyRegulatoryFocus: 'Federal Banking Regulator', 
        penaltiesSummary: 'Failure to meet issuer standards can result in loss of "permitted payment stablecoin" status, operational bans, and financial penalties.',
        sourceSections: 'Sec. 101 (Definitions), Specific Stablecoin Legislation (referenced by implication)',
        notes: 'CFTC explicitly has "NO AUTHORITY OVER PERMITTED PAYMENT STABLECOINS" operations/issuer, deferring to other regulators.'
      },
       {
        requirementId: 'COMPL-006',
        requirementTitle: 'AML/CFT Compliance',
        description: 'Entities involved in digital asset transactions, particularly exchanges, brokers, and certain issuers, are expected to comply with Anti-Money Laundering (AML) and Counter-Financing of Terrorism (CFT) regulations, typically enforced by FinCEN. This includes KYC/CDD procedures and SAR filing.',
        responsibleEntities: ['Exchanges', 'Brokers', 'Custodians', 'Payment Processors'],
        keyRegulatoryFocus: 'FINCEN',
        penaltiesSummary: 'Significant fines, criminal charges, and reputational damage for non-compliance.',
        sourceSections: 'Bank Secrecy Act and related regulations (implicitly applicable).',
        notes: 'While not explicitly detailed in these specific bill texts, AML/CFT is a foundational requirement for financial intermediaries.'
      }
    ],
    relatedLinks: [
        { path: 'executive-summary', linkText: 'Revisit the Executive Summary' },
        { path: 'detailed-analysis/regulatory-jurisdiction', linkText: 'Review Regulatory Jurisdiction Details'}
    ]
  },
  {
    id: 'conclusion-outlook',
    title: 'VI. Conclusion and Outlook',
    shortTitle: 'Conclusion',
    content: [
      'The "Clarity Act of 2025," through its original text and the subsequent Amendments in the Nature of a Substitute from the House Financial Services Committee (HFSC) and the House Agriculture Committee (HAG), collectively represents a methodical and comprehensive attempt to construct a regulatory architecture for the U.S. digital asset market. The core objectives—defining digital assets, allocating jurisdiction between the SEC and CFTC, and establishing registration and compliance regimes for intermediaries—are shared across all versions. However, the nuanced differences in definitions, the scope of safe harbors, specific compliance burdens, and the mechanisms for regulatory adaptability reveal distinct legislative priorities and approaches between the committees.',
      'Key takeaways from this comparative analysis include the HAG ANS\'s introduction of a potential safe harbor for non-controlling blockchain developers and its preference for SEC rulemaking to set precise limits on insider sales of digital commodities, suggesting a focus on fostering innovation while allowing for regulatory flexibility. The HFSC ANS\'s proposal for "Other tradable assets" under CFTC oversight offers a pragmatic solution for regulating novel assets that defy easy categorization. Both committee versions refine foundational definitions, with the HAG ANS often providing more granular detail, particularly in distinguishing digital commodities from securities. Furthermore, the HAG ANS places a stronger emphasis on certain investor disclosures, such as those related to asset treatment in insolvency by SEC-registered brokers.',
      'The differences between the HFSC and HAG versions, while not always contradictory, will likely necessitate a robust reconciliation process, possibly through a conference committee or further amendments, should the legislation advance. The HAG ANS, with its unique developer protection clause and more detailed definitional exclusions, arguably presents more significant departures from the framework of the original bill in certain areas, while the HFSC ANS introduces structural innovations like the "other tradable assets" category. Areas of emerging consensus are visible in the broad agreement on the core functions of SEC and CFTC innovation hubs (FinHub and LabCFTC) and the need for extensive studies on DeFi, NFTs, and financial literacy.',
      'Despite these legislative efforts, certain key issues may remain unresolved or require further refinement. The precise line between an "investment contract asset" (SEC-regulated offering) and a "digital commodity" (CFTC-regulated spot market asset) will continue to depend heavily on the facts and circumstances of each asset and the interpretation of "maturity" and "decentralization." The effectiveness of the "mature blockchain system" certification process will be critical. For market participants, the differing approaches could lead to varied compliance costs and strategic considerations depending on which version, or a hybrid thereof, ultimately becomes law. The HAG ANS\'s developer safe harbor, if adopted, could significantly reduce legal uncertainty for software creators, potentially spurring U.S.-based innovation. Conversely, the absence of such a provision, or a very narrowly defined one, might continue to push development to jurisdictions perceived as more legally favorable.',
      'Ultimately, the parallel development of two comprehensive ANS versions by distinct House committees underscores the fundamental challenge of integrating novel digital asset concepts into existing financial regulatory structures. The divergences reflect not just differing committee mandates but also evolving philosophies on how best to balance investor protection, market integrity, and the promotion of innovation in this dynamic sector. The path to a single, coherent U.S. framework will depend on the ability to reconcile these foundational disagreements. The presence of uniquely beneficial provisions in each committee\'s proposal—such as the HAG\'s developer protections and the HFSC\'s mechanism for "other tradable assets"—may provide fertile ground for compromise, potentially leading to a final bill that incorporates the most impactful and well-considered elements from each iteration. The legislative journey of the Clarity Act will be a key indicator of the U.S. approach to regulating the next generation of financial technology.'
    ],
    relatedLinks: [
        { path: 'executive-summary', linkText: 'Revisit the Executive Summary' }
    ]
  }
];