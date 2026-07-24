// Content model for Workbook 1 — Business, Positionnement & Voix.
// Each section is either "single" (a fixed list of fields), "repeat" (the
// same field template repeated N times, e.g. 4 croyances, 3 cas clients),
// "intro" or "final".
//
// `examples` = an array of full worked examples (collapsible boxes), drawn
// from Thomas's own real answers (not a fictional client) — the mechanic is:
// this is what a genuinely useful answer looks like, so the client doesn't
// stare at a blank page. Some sections carry two examples (e.g. "Histoire")
// to show both the 1st-person case (target = provider's own past) and the
// 3rd-person case (target ≠ provider's own past).
// `placeholders` = short ghost-text drawn from the same real material,
// shown directly inside the inputs (for repeat sections: an array indexed
// by repetition; for single sections: an object keyed by field).
// `recap` = pulls a previous answer back on screen at a later step, so the
// client can build on what they already wrote instead of starting cold.
// `expandable` + `repeatMax` = a repeat section can start with a smaller
// `repeatCount` and let the client add more entries (up to repeatMax) via a
// button, instead of imposing a fixed number.
// `pairedWith` = a repeat section whose card #i should show a small recap of
// card #i from another repeat section (e.g. "Nouvelles croyances" card #2
// recaps "Croyances" card #2), so the two lists stay visually linked one-to-one
// as the client adds more entries to either one.
// Field `type: 'scale'` renders a clickable 1-10 (or custom min/max) scale
// instead of a free-text input, for calibration-style questions.

export const sections = [
  {
    id: 'intro',
    num: '0',
    kind: 'intro',
    title: 'Bienvenue dans ton workbook',
    subtitle:
      "Ce document sert à définir ta stratégie de contenu ET le copywriting de ton profil. Compte 45-60 minutes, pris au sérieux — pas 20 minutes bâclées. Ne paraphrase pas : les mots exacts, les exemples concrets et les chiffres sont ce qui rend chaque réponse utilisable.",
    fields: [
      { key: 'client_name', label: 'Ton prénom et nom', type: 'text', placeholder: 'ex : Thomas Fournier' },
      { key: 'client_email', label: 'Ton email', type: 'text', placeholder: 'ex : thomas@kalanis.co' },
    ],
  },
  {
    id: 'croyances',
    num: '1',
    kind: 'repeat',
    title: 'Croyances de ta cible',
    subtitle:
      "Pas de paraphrase — les mots exacts que tes prospects ou clients utilisent quand ils te parlent de leur problème. Pour chaque croyance, une preuve concrète ou un chiffre qui montre que ça bloque vraiment. Commence avec 3 croyances, ajoutes-en d'autres si tu en as plus.",
    repeatCount: 3,
    expandable: true,
    repeatMax: 8,
    repeatLabel: 'Croyance',
    repeatFields: [
      { key: 'verbatim', label: 'Croyance actuelle (verbatim, entre guillemets)', type: 'textarea' },
      { key: 'preuve', label: 'Preuve que ça bloque (exemple concret ou chiffre)', type: 'textarea' },
    ],
    placeholders: [
      {
        verbatim: '"J\'ai juste besoin de faire plus de volume, plus de posts, plus de setting..."',
        preuve: 'Faire plus de zéro = zéro. Si la base est mauvaise, inutile de forcer.',
      },
      {
        verbatim: '"Tout le monde utilise l\'IA, c\'est la solution pour faire plus"',
        preuve: 'Si l\'IA était vraiment la solution, on serait tous multimillionnaires. Elle crée des clones et des résultats moyens.',
      },
      {
        verbatim: '"Je ne suis pas un créateur de contenu, je suis un expert"',
        preuve: 'L\'expertise qui ne se voit pas n\'existe pas pour le marché — tu es obligé de créer du contenu aujourd\'hui.',
      },
    ],
    examples: [
      {
        tag: 'Exemple inspirant',
        title: 'Exemple complet — mes propres croyances (Thomas)',
        body: [
          { label: 'Croyance', text: '"J\'ai juste besoin de faire plus de volume, plus de posts, plus de setting..."' },
          { label: 'Preuve', text: 'Faire plus de zéro = zéro. Si la base est mauvaise c\'est inutile de forcer.' },
          { label: 'Croyance', text: '"Tout le monde utilise l\'IA, c\'est la solution pour faire plus"' },
          { label: 'Preuve', text: 'Si l\'IA était vraiment la solution, on serait tous multimillionnaires. L\'IA crée des clones et des résultats moyens.' },
          { label: 'Croyance', text: '"Je ne suis pas un créateur de contenu, je suis un expert"' },
          { label: 'Preuve', text: 'L\'expertise qui ne se voit pas n\'existe pas pour le marché, tu es obligé de créer du contenu aujourd\'hui.' },
        ],
      },
    ],
  },
  {
    id: 'nouvelles_croyances',
    num: '2',
    kind: 'repeat',
    title: 'Nouvelles croyances à ancrer',
    subtitle:
      "Pour chaque croyance de la section précédente, la croyance de remplacement que tu veux ancrer chez ton audience — avec une preuve ou une histoire courte (un client réel, un chiffre). Chaque carte rappelle la croyance correspondante ci-dessus. Commence avec 3, ajoutes-en d'autres si tu en as plus.",
    repeatCount: 3,
    expandable: true,
    repeatMax: 8,
    repeatLabel: 'Nouvelle croyance',
    repeatFields: [
      { key: 'formulation', label: 'Nouvelle croyance (1 phrase)', type: 'textarea' },
      { key: 'preuve', label: 'Preuve / histoire courte', type: 'textarea' },
    ],
    placeholders: [
      {
        formulation: 'Pour réussir sur LinkedIn je ne dois pas faire plus, je dois faire simple',
        preuve: 'Capucine, Louis, Nathan, moi : on n\'a jamais posté plus. On a fait mieux — un profil clair, unique, différenciant.',
      },
      {
        formulation: 'Ma clarté est mon autorité : elle me rend unique et attire mes clients sans que j\'aie à jouer un rôle',
        preuve: 'Noëlie, domaine ultra technique, a reçu des messages et demandes de calls dès les premières semaines après une refonte simple.',
      },
      {
        formulation: 'Le marché ne rejette pas mon expertise mais le bruit que font les clones — être moi-même est le seul moyen d\'avoir un business pérenne',
        preuve: '6 mois à faire comme les autres = 0 client. Le jour où j\'ai arrêté, ça a changé.',
      },
    ],
    examples: [
      {
        tag: 'Exemple inspirant',
        title: 'Exemple complet — mes propres nouvelles croyances (Thomas)',
        body: [
          { label: 'Nouvelle croyance', text: 'Pour réussir sur LinkedIn je ne dois pas faire plus, je dois faire simple.' },
          { label: 'Preuve', text: 'Capucine, Louis, Nathan, moi, on n\'a jamais fait plus. Mais on a fait mieux : un profil clair, unique, différenciant. Nathan n\'a jamais posté plus, on lui a créé un univers sur-mesure et le mois suivant il a fait +12k€.' },
          { label: 'Nouvelle croyance', text: 'Ma clarté est mon autorité : elle me rend unique et attire mes clients sans que j\'aie à jouer un rôle ou à me vendre.' },
          { label: 'Preuve', text: 'Noëlie, ingénieure en système embarqué, domaine ultra technique. Avec une refonte simple : dès les premières semaines, messages, demandes de calls (même des US) et une conférence à animer.' },
        ],
      },
    ],
    pairedWith: 'croyances',
  },
  {
    id: 'histoire',
    num: '3',
    kind: 'single',
    title: 'Ton histoire (6 étapes)',
    subtitle:
      "On ne change pas une croyance avec un argument, mais avec une histoire. Réponds étape par étape. Deux modèles ci-dessous : à la 1re personne si ta cible te ressemble (elle vit ce que tu as vécu), à la 3e personne si tu accompagnes un secteur ou un profil que tu n'as jamais vécu toi-même.",
    fields: [
      { key: 'avant', label: '1. Avant (comme ta cible aujourd\'hui)', type: 'textarea' },
      { key: 'probleme', label: '2. Problème / frustration', type: 'textarea' },
      { key: 'declic', label: '3. Déclic / révélation', type: 'textarea' },
      { key: 'nouvelle_approche', label: '4. Nouvelle approche (ta méthode)', type: 'textarea' },
      { key: 'resultat_mesurable', label: '5. Résultat obtenu (mesurable — chiffres réels)', type: 'textarea' },
      { key: 'pourquoi_ca_marche', label: '6. Pourquoi ça peut marcher pour tes clients aussi', type: 'textarea' },
    ],
    placeholders: {
      avant: 'Y\'a 3-4 ans je postais tous les jours pour vendre mes services, sans jamais avoir de client...',
      probleme: 'J\'avais l\'impression de tout bien faire — mais zéro résultat, pas un seul client.',
      declic: 'Un post d\'un créateur que je suivais m\'a fait réaliser que la solution n\'était pas de faire plus ou "comme eux".',
      nouvelle_approche: 'J\'ai arrêté de faire ce qu\'on me disait. Identité plus personnelle, storytelling, concepts uniques.',
      resultat_mesurable: '150+ projets clients, 3M+ impressions, 60k+€ générés, Nathan +12k€ en 1 mois.',
      pourquoi_ca_marche: 'Parce qu\'on fait 80% du job à leur place — ils n\'ont plus qu\'à suivre un système construit sur-mesure.',
    },
    recap: [{ label: 'Nouvelle croyance modèle (section 2)', path: 'nouvelles_croyances.0.formulation' }],
    examples: [
      {
        tag: '1re personne — ta cible te ressemble',
        title: 'Exemple complet — mon histoire (Thomas)',
        body: [
          {
            label: '1. Avant',
            text: 'Y\'a 3/4 ans je postais absolument tous les jours sur LinkedIn pour vendre mes services de graphisme, je faisais des carrousels, ma routine, je partageais des conseils, des astuces/tutos, j\'avais optimisé mon profil. Pourtant +6 mois je n\'ai jamais eu aucun client — des posts à 3/4 likes, jamais plus. Je voyais des freelances pas plus talentueux que moi réussir sur LinkedIn alors que j\'étais bloqué à 0.',
          },
          {
            label: '2. Problème / frustration',
            text: 'J\'avais l\'impression de tout bien faire : posts réguliers, routine d\'engagement, messages de prospection, belle bannière... Mais rien, zéro résultat, pas un seul client.',
          },
          {
            label: '3. Déclic / révélation',
            text: 'Un post d\'Hugo Gedio sur sa réussite via des contenus humains qui parlaient de son histoire. Je me suis dit : des créateurs lancés après moi ont 3 ans d\'avance, et leur contenu n\'a rien d\'extraordinaire — ils postent même moins que moi. La solution n\'était pas de faire plus ou "comme eux".',
          },
          {
            label: '4. Nouvelle approche',
            text: 'J\'ai arrêté de faire ce qu\'on me disait. J\'ai refait mon identité pour avoir quelque chose de plus personnel, ajouté du storytelling, créé mes concepts uniques. Une approche en 3 étapes : un univers visuel unique, une création de contenu simplifiée, des messages de setting "cool" aux bonnes personnes.',
          },
          {
            label: '5. Résultat obtenu',
            text: '150+ projets clients entre refonte LinkedIn, identité visuelle et accompagnement. 3M+ d\'impressions sur mes posts. 60k+€ générés. Nathan +12k€ en un mois. Louis, premier client 100% inbound. Noëlie, une dizaine de calls + une conférence animée en 1 mois. Capucine, 2 clients high ticket + 10 ventes d\'ebook.',
          },
          {
            label: '6. Pourquoi ça marche pour eux aussi',
            text: 'Parce qu\'on fait 80% du job à leur place. Ils reçoivent un système construit sur-mesure, avec un suivi régulier — retours sur les posts, consulting par message. Ils n\'ont plus qu\'à suivre ce qu\'on a identifié sur leur marché et sur eux-mêmes.',
          },
        ],
      },
      {
        tag: '3e personne — ta cible ne te ressemble pas',
        title: 'Exemple complet — histoire modèle à la 3e personne (quand tu n\'as jamais vécu le métier de ta cible)',
        body: [
          {
            label: 'Quand utiliser ce modèle',
            text: 'Si tu accompagnes un profil ou un secteur que tu n\'as jamais vécu toi-même (ex : tu développes des applications pour le BTP mais tu n\'as jamais travaillé dans le BTP), ta légitimité ne vient pas de ton vécu personnel — elle vient des problèmes précis que tu as déjà résolus. L\'histoire se raconte alors à la 3e personne, autour de l\'expertise et des résultats, pas d\'une expérience vécue que tu n\'as pas.',
          },
          {
            label: '1. Avant',
            text: 'Julien vendait ses services de développement à peu près à tout le monde — sites vitrines, applications mobiles, quelques tableaux de bord. Aucune spécialisation : à chaque prospect, il repartait de zéro pour expliquer ce qu\'il savait faire.',
          },
          {
            label: '2. Problème / frustration',
            text: 'Les entreprises du BTP qu\'il démarchait lui répétaient toutes la même chose : leurs outils actuels (Excel, papier, logiciels génériques) leur faisaient perdre un temps fou sur les chantiers, mais aucun développeur ne semblait comprendre leurs contraintes de terrain.',
          },
          {
            label: '3. Déclic / révélation',
            text: 'En échangeant avec un chef de chantier client, Julien a compris que le blocage n\'était jamais technique — les développeurs savaient coder. C\'était l\'absence de compréhension du métier qui faisait échouer les projets. Il n\'avait pas besoin d\'avoir posé des parpaings : il avait besoin d\'écouter et de traduire les irritants du métier en fonctionnalités simples.',
          },
          {
            label: '4. Nouvelle approche',
            text: 'Julien a arrêté de se présenter comme "développeur généraliste" et s\'est spécialisé à 100% sur les applications métier pour le BTP — en construisant sa légitimité non pas sur un vécu terrain qu\'il n\'a pas, mais sur les problèmes précis déjà résolus pour ce secteur, documentés cas par cas.',
          },
          {
            label: '5. Résultat obtenu',
            text: 'En se concentrant sur ce seul secteur, il a livré plusieurs applications pour des entreprises du BTP, avec des retours clients concrets sur le temps gagné sur le terrain — et un discours enfin différenciant face aux développeurs généralistes.',
          },
          {
            label: '6. Pourquoi ça marche pour eux aussi',
            text: 'Parce que sa preuve ne repose pas sur "j\'ai vécu votre métier" mais sur "j\'ai déjà résolu vos problèmes" — la spécialisation et les résultats documentés remplacent le vécu personnel comme source de crédibilité.',
          },
        ],
      },
    ],
  },
  {
    id: 'resultats_clients',
    num: '4',
    kind: 'repeat',
    title: 'Résultats clients (preuve sociale)',
    subtitle:
      "3 clients réels. Nom (ou initiales), situation de départ, ce que vous avez fait ensemble, résultat chiffré, délai.",
    repeatCount: 3,
    repeatLabel: 'Client',
    repeatFields: [
      { key: 'nom', label: 'Nom / initiales', type: 'text' },
      { key: 'situation_depart', label: 'Situation de départ', type: 'textarea' },
      { key: 'action', label: 'Ce qui a été fait', type: 'textarea' },
      { key: 'resultat', label: 'Résultat chiffré', type: 'text' },
      { key: 'delai', label: 'Délai', type: 'text' },
    ],
    placeholders: [
      {
        nom: 'Nathan',
        situation_depart: 'Profil générique, contenu qui ne se démarquait pas',
        action: 'Univers visuel sur-mesure + carrousels et cas clients uniques',
        resultat: '+12 850€ en 1 mois',
        delai: '1 mois',
      },
      {
        nom: 'Louis',
        situation_depart: 'Jargon technique, personne ne comprenait comment l\'acheter',
        action: 'Simplification du profil et du message',
        resultat: '1er client 100% inbound',
        delai: '~2 mois',
      },
      {
        nom: 'Noëlie',
        situation_depart: 'Domaine ultra technique, prospection inconsistante',
        action: 'Refonte de profil + stratégie de contenu simple',
        resultat: '10 calls + 1 conférence animée',
        delai: '1 mois',
      },
    ],
    examples: [
      {
        tag: 'Exemple inspirant',
        title: 'Exemple complet — mes cas clients (Thomas)',
        body: [
          { label: 'Nathan', text: 'Profil générique → univers visuel sur-mesure + carrousels uniques → +12 850€ en 1 mois.' },
          { label: 'Louis', text: 'Jargon technique, invendable → simplification du profil et du message → 1er client 100% inbound.' },
          { label: 'Noëlie', text: 'Domaine ultra technique, prospection inconsistante → refonte + stratégie simple → 10 calls et 1 conférence animée en 1 mois.' },
        ],
      },
    ],
  },
  {
    id: 'differenciation',
    num: '5',
    kind: 'single',
    title: 'Ta vraie différenciation',
    subtitle:
      "La première réponse est presque toujours la version polie. On veut celle d'après.",
    fields: [
      { key: 'generique', label: 'Ce que tout le monde dans ton secteur affirme (version générique)', type: 'textarea' },
      { key: 'vraie_croyance', label: 'Ce que toi tu crois vraiment, même si ça contredit le marché', type: 'textarea' },
      { key: 'preuve', label: 'La preuve qui soutient ta version', type: 'textarea' },
    ],
    placeholders: {
      generique: 'Je poste régulièrement, je donne des conseils, je suis actif sur LinkedIn',
      vraie_croyance: 'Il ne faut pas faire plus, il faut faire simple — la clarté prime sur le volume',
      preuve: 'Le test du Post Miroir : demande à l\'IA un post sur ton expertise, elle sort les 5 mêmes conseils que 1000 concurrents.',
    },
    examples: [
      {
        tag: 'Exemple inspirant',
        title: 'Exemple complet — ma différenciation (Thomas)',
        body: [
          { label: 'Version générique (ce que tout le monde dit)', text: 'Il faut poster régulièrement, donner de la valeur, être actif sur LinkedIn.' },
          { label: 'Ma vraie croyance', text: 'Il ne faut pas faire plus, il faut faire simple. Le jargon parle aux pairs, pas aux clients.' },
          { label: 'Preuve', text: 'Le test du Post Miroir : demande à l\'IA de rédiger un post sur ton expertise, elle te sort les 5 mêmes conseils que tes 1000 concurrents.' },
        ],
      },
    ],
  },
  {
    id: 'ancrage',
    num: '6',
    kind: 'single',
    title: "Point d'ancrage",
    subtitle: 'Une phrase qui relie ta conviction à ton offre — mémorable, répétable.',
    fields: [
      { key: 'phrase', label: "Ta phrase d'ancrage", type: 'textarea' },
      { key: 'preuve_associee', label: 'Preuve associée', type: 'textarea' },
      { key: 'cta', label: 'Un CTA naturel qui en découle', type: 'text' },
    ],
    placeholders: {
      phrase: 'Unique par le visuel. Visible par le contenu. Trouvé par tes clients.',
      preuve_associee: 'J\'ai x2 mon CA en diminuant mes posts, /10 mes impressions — mais elles sont bien plus qualifiées.',
      cta: 'Découvre comment [Client] a x2 son CA sans poster ni prospecter plus ↓',
    },
    examples: [
      {
        tag: 'Exemple inspirant',
        title: 'Exemple complet — mon point d\'ancrage (Thomas)',
        body: [
          { label: 'Phrase d\'ancrage', text: 'Tant qu\'il fait comme tout le monde sans une identité claire et différenciante visuellement et dans son contenu, il restera invisible peu importe ses efforts.' },
          { label: 'Preuve associée', text: 'J\'ai x2 mon CA en diminuant mes posts, presque /10 mes impressions, mais elles sont beaucoup plus qualifiées.' },
          { label: 'CTA naturel', text: 'Découvre comment Nathan a fait +12k€ en un mois sans poster plus ↓' },
        ],
      },
    ],
  },
  {
    id: 'angles',
    num: '7',
    kind: 'repeat',
    title: 'Angles de communication',
    subtitle: "L'amorce directe de ton futur calendrier éditorial. Commence avec 3 angles, ajoute-en d'autres si tu en as plus.",
    repeatCount: 3,
    expandable: true,
    repeatMax: 8,
    repeatLabel: 'Angle',
    repeatFields: [
      { key: 'croyance', label: 'Croyance ciblée', type: 'textarea' },
      { key: 'preuve', label: 'Preuve', type: 'textarea' },
      { key: 'format', label: 'Format (post / carrousel / vidéo...)', type: 'text' },
      { key: 'cta', label: 'CTA', type: 'text' },
    ],
    placeholders: [
      {
        croyance: 'Il ne faut pas poster plus, mais plus simplement pour que ta cible te comprenne',
        preuve: 'Noëlie vulgarise un domaine ultra technique en 1 post/semaine et se fait contacter',
        format: 'Post LinkedIn',
        cta: 'Découvre le cas client complet',
      },
      {
        croyance: 'L\'IA n\'est pas la solution car elle crée des clones et des résultats moyens',
        preuve: 'Le test du Post Miroir',
        format: 'Post LinkedIn',
        cta: 'Envoie-moi un message pour une analyse de ton contenu',
      },
      {
        croyance: 'La réussite repose sur un système : Profil, Contenu, Setting — enlève un seul, tout s\'écroule',
        preuve: 'Le paradoxe de l\'expert invisible : posts incroyables mais 0 DM faute de profil clair',
        format: 'Carrousel LinkedIn',
        cta: 'Réserve un appel pour analyser ta situation',
      },
    ],
    examples: [
      {
        tag: 'Exemple inspirant',
        title: 'Exemple complet — mes angles (Thomas)',
        body: [
          { label: 'Angle 1', text: 'Croyance : il ne faut pas poster plus, mais plus simplement · Preuve : Noëlie vulgarise en 1 post/semaine et se fait contacter · Format : Post LinkedIn · CTA : cas client complet.' },
          { label: 'Angle 2', text: 'Croyance : l\'IA crée des clones et des résultats moyens · Preuve : le test du Post Miroir · Format : Post LinkedIn · CTA : analyse de contenu.' },
          { label: 'Angle 3', text: 'Croyance : Profil + Contenu + Setting, enlève un seul et tout s\'écroule · Preuve : le paradoxe de l\'expert invisible · Format : Carrousel · CTA : appel de diagnostic.' },
        ],
      },
    ],
    recap: [
      { label: 'Nouvelle croyance modèle (section 2)', path: 'nouvelles_croyances.0.formulation' },
      { label: 'Ta vraie différenciation (section 5)', path: 'differenciation.vraie_croyance' },
    ],
  },
  {
    id: 'voix',
    num: '8',
    kind: 'single',
    title: 'Ta voix',
    subtitle: 'Ce qui rend ton contenu reconnaissable comme venant de toi. On cherche ici ton ton de voix à l\'oral pour pouvoir construire un ton à l\'écrit qui te colle vraiment — pas une liste d\'adjectifs.',
    fields: [
      { key: 'ton_oral', label: 'Décris ta personnalité et ton énergie à l\'oral (avec un client, un ami) : calme ou explosif ? posé ou direct ? beaucoup d\'humour ou plutôt sérieux ?', type: 'textarea' },
      { key: 'expressions', label: 'Des expressions, mots ou tics de langage qui reviennent souvent chez toi à l\'oral', type: 'textarea' },
      { key: 'registre', label: 'Tutoiement/vouvoiement, formel/familier — comment tu t\'adresses naturellement aux gens', type: 'text' },
      { key: 'sujets_ok', label: 'Sujets personnels que tu es à l\'aise d\'intégrer (ville, humour, passions...)', type: 'textarea' },
      { key: 'sujets_interdits', label: 'Sujets interdits, même si ça ferait un bon post', type: 'textarea' },
      { key: 'aisance_vente', label: 'Sur 10, à combien es-tu à l\'aise à l\'idée de faire un post de vente à 100% ?', type: 'scale', min: 1, max: 10 },
      { key: 'aisance_storytelling', label: 'Sur 10, à combien es-tu à l\'aise avec le storytelling personnel dans tes posts ?', type: 'scale', min: 1, max: 10 },
    ],
    placeholders: {
      ton_oral: 'Direct et posé, j\'aime bien détendre avec un peu d\'humour, mais je vais droit au but — je n\'aime pas tourner autour du pot.',
      expressions: '"Concrètement...", "en vrai", "il n\'y a pas de secret", je termine souvent par une image ou une comparaison simple.',
      registre: 'Tutoiement, familier mais jamais vulgaire — comme si je parlais à un client que je connais bien.',
      sujets_ok: 'Ma ville, mes passions, mon humour, des anecdotes perso',
      sujets_interdits: 'Ma vie de famille en détail',
    },
  },
  {
    id: 'objectifs',
    num: '9',
    kind: 'single',
    title: 'Objectifs & contraintes',
    subtitle: 'Un objectif atteignable en 90 jours — pas "10k€/mois en 3 semaines". Un objectif réaliste tient compte de ton point de départ (nombre d\'abonnés, régularité actuelle, offre déjà en place).',
    fields: [
      { key: 'objectif_90j', label: 'Objectif chiffré à 90 jours (CA, clients, positionnement)', type: 'textarea' },
      { key: 'client_a_refuser', label: 'Le client que tu refuserais aujourd\'hui même s\'il payait plein tarif — et pourquoi', type: 'textarea' },
      { key: 'temps_dispo', label: 'Temps réel disponible par semaine pour le contenu (sois honnête)', type: 'text' },
    ],
    placeholders: {
      objectif_90j: 'Exemples réalistes : signer 2 à 3 nouveaux clients, doubler mon taux de réponse en message, passer de 500 à 2000 vues moyennes par post, structurer une offre claire et un profil optimisé d\'ici la fin du trimestre.',
      client_a_refuser: 'Quelqu\'un qui veut juste "plus de vues" sans vouloir changer sa façon de communiquer',
      temps_dispo: '5-7h/semaine',
    },
  },
  {
    id: 'final',
    num: '10',
    kind: 'final',
    title: 'Le mot de la fin',
    subtitle: '',
    fields: [
      { key: 'mot_de_la_fin', label: 'Qu\'est-ce que ce workbook ne t\'a pas demandé et que tu meurs d\'envie de dire ?', type: 'textarea' },
    ],
    checklist: [
      'Croyances listées avec verbatims + preuve',
      'Nouvelles croyances avec preuve',
      'Histoire complète avec résultat mesurable',
      '3 résultats clients chiffrés',
      'Différenciation réelle (pas la version polie)',
      "Point d'ancrage clair",
      'Angles de communication prêts',
      'Voix et objectifs définis',
    ],
  },
]
