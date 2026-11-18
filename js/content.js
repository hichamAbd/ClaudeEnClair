/*
  Claude en clair : tout le texte du guide.

  Syntaxe dans les textes :
    [[cle]] ou [[cle|texte affiché]]  = mot souligné, expliqué au toucher (voir LEXIQUE plus bas).
    [ ... ] dans un prompt             = passage que le lecteur remplace avant d'envoyer.
  Les espaces insécables du français (avant : ; ? ! et dans « ») sont ajoutées automatiquement.
  Faits vérifiés sur le centre d'aide de Claude en novembre 2026 (voir CLAUDE.md).
*/
window.GUIDE = {
  titre: "Claude en clair",
  accroche: "Le guide pour bien travailler avec Claude, sans jargon.",
  idee: "Vous apportez l'expertise. Claude fait le travail de fourmi : chercher, calculer, rédiger, programmer.",
  aide: "Ouvrez un chapitre pour commencer. Un mot souligné s'explique d'un clic, et chaque écran propose un [[prompt]] à copier dans Claude.",
  pied: "Guide indépendant, sans lien avec Anthropic. À jour en novembre 2026.",

  chapitres: [
    {
      id: "essentiel",
      titre: "L'essentiel",
      resume: "Trois réflexes qui changent tout.",
      embleme: "boussole",
      idee: "Parlez à Claude comme à un collègue brillant qui vient d'arriver : il sait beaucoup de choses, mais rien de votre [[contexte]].",
      savoirPlus: "Explique-moi simplement comment tu fonctionnes, ce que tu fais très bien et où tu risques de te tromper. Je suis économiste, pas informaticien.",
      points: [
        {
          titre: "Donnez-lui le contexte",
          idee: "La qualité de la réponse dépend surtout de ce que vous lui dites au départ.",
          details: [
            "Dites qui vous êtes, ce que vous cherchez et pour qui est le résultat : un comité, un collègue, le grand public.",
            "Joignez les documents utiles au lieu de les résumer : il les lit en entier, en quelques secondes.",
            "Montrez un exemple de ce que vous attendez : une ancienne note, un tableau type, un graphique réussi."
          ],
          prompt: "Je suis économiste, spécialiste de [votre domaine]. Je dois [votre objectif] pour [votre public]. Avant de répondre, pose-moi les questions dont tu as besoin."
        },
        {
          titre: "Avancez par étapes",
          idee: "Un gros problème se découpe. Claude excelle à planifier, puis à exécuter morceau par morceau.",
          details: [
            "Demandez d'abord un plan, corrigez-le, puis faites exécuter une étape à la fois.",
            "Pour une question difficile, choisissez le [[modele|modèle]] le plus puissant ; pour un état de l'art, le mode [[recherche|Recherche]].",
            "Faites-lui jouer le contradicteur : « Quelles sont les trois faiblesses de ce raisonnement ? »"
          ],
          prompt: "Voici mon problème : [décrivez-le]. Ne le résous pas tout de suite : propose un plan en étapes, avec les hypothèses à vérifier à chacune."
        },
        {
          titre: "Gardez la main",
          idee: "Claude peut se tromper avec aplomb : c'est ce qu'on appelle une [[hallucination]]. Votre expertise reste le garde-fou.",
          details: [
            "Faites vérifier : demandez les sources, le détail des calculs, et testez sur un cas dont vous connaissez la réponse.",
            "Les règles de votre institution passent avant tout : aucune donnée confidentielle ou non publiée dans un compte personnel.",
            "Dans Paramètres > Confidentialité, choisissez si vos conversations peuvent servir à améliorer Claude. Le [[incognito|mode incognito]] ne garde rien dans l'historique."
          ],
          prompt: "Relis ta réponse comme un rapporteur exigeant : quelles affirmations sont fragiles, lesquelles dois-je vérifier, et comment ?"
        }
      ]
    },

    {
      id: "croiser",
      titre: "Croiser des données",
      resume: "Rapprocher des sources sans perdre le fil.",
      embleme: "croiser",
      idee: "Claude rapproche très bien des sources différentes, à condition de lui dire comment elles se correspondent.",
      savoirPlus: "Explique-moi les pièges classiques quand on fusionne des séries économiques venant de sources différentes : fréquences, unités, révisions, ruptures. Un exemple pour chacun.",
      points: [
        {
          titre: "Présentez chaque source",
          idee: "Avant de fusionner, Claude doit savoir ce que contient chaque fichier.",
          details: [
            "Pour chaque fichier : le contenu, l'unité, la fréquence, la période et la source.",
            "Précisez la clé commune : code pays, date, identifiant d'entité ou de contrepartie.",
            "Signalez les pièges que vous connaissez : changement d'année de base, rupture de série, données révisées."
          ],
          prompt: "Voici deux fichiers : [décrivez-les]. Avant de les fusionner, liste tout ce qui pourrait poser problème : unités, fréquences, définitions, clés."
        },
        {
          titre: "Faites contrôler la fusion",
          idee: "Une fusion peut sembler réussie et perdre des lignes en silence. Exigez un rapport.",
          details: [
            "Demandez le nombre de lignes avant et après, et la liste de ce qui n'a pas trouvé de correspondance.",
            "Faites expliciter chaque conversion : mensuel en trimestriel (moyenne ou fin de période ?), devises, nominal ou réel.",
            "Vérifiez deux ou trois cas que vous connaissez par cœur."
          ],
          prompt: "Fusionne ces fichiers, puis donne-moi un rapport de contrôle : lignes sans correspondance, doublons, valeurs manquantes et chaque conversion effectuée."
        },
        {
          titre: "Gardez la recette",
          idee: "Le vrai résultat n'est pas le tableau : c'est le programme qui permet de le refaire.",
          details: [
            "Demandez le [[script]] R ou SAS qui refait tout, commenté en français à chaque étape.",
            "Données confidentielles : faites-le écrire sur des données publiques ou fictives de même structure, puis lancez-le vous-même au bureau.",
            "Tenez un journal des choix (sources, conversions, exclusions) : il deviendra votre note méthodologique."
          ],
          prompt: "Écris le programme R qui refait ce rapprochement, avec un commentaire en français à chaque étape, pour que je puisse le relancer sur mes données."
        }
      ]
    },

    {
      id: "gros-fichiers",
      titre: "Les gros fichiers",
      resume: "Des millions de lignes, sans panique.",
      embleme: "base",
      idee: "Pour un gros fichier, Claude n'a pas besoin de tout voir : il a besoin d'en comprendre la structure.",
      savoirPlus: "Quelles sont les différentes façons de travailler avec toi sur un très gros jeu de données ? Donne les avantages et les limites de chacune, simplement.",
      points: [
        {
          titre: "Montrez la structure, pas tout",
          idee: "Un échantillon bien choisi suffit à Claude pour écrire le bon programme.",
          details: [
            "Donnez le dictionnaire des variables (nom, type, signification) et quelques dizaines de lignes représentatives.",
            "Claude écrit le programme ; vous l'exécutez sur le fichier complet, dans R ou SAS.",
            "Rapportez-lui les résultats ou les messages d'erreur : il corrige et explique."
          ],
          prompt: "Voici la structure de ma table (colonnes, types, 50 lignes d'exemple) : [collez-la]. Écris un programme SAS qui calcule [votre indicateur] sur la table complète, en ménageant la mémoire."
        },
        {
          titre: "Laissez-le calculer",
          idee: "Claude peut [[code|exécuter du vrai code]] pour analyser un fichier que vous lui confiez.",
          details: [
            "Avec des données publiques (FMI, BRI, Eurostat…), déposez le fichier dans la conversation : jusqu'à 500 Mo par fichier.",
            "Demandez les chiffres clés, des graphiques et un fichier Excel propre en sortie.",
            "Exigez qu'il montre son code et qu'il recoupe ses résultats par un second calcul."
          ],
          prompt: "Analyse ce fichier : décris les données, repère les valeurs aberrantes et les ruptures, puis propose trois graphiques utiles. Montre ton code."
        },
        {
          titre: "Confiez-lui un dossier entier",
          idee: "Avec l'[[bureau|application Claude pour ordinateur]], Claude peut travailler directement dans un dossier.",
          details: [
            "Ajoutez un dossier : Claude y lit et y écrit les fichiers, sans que vous ayez à les déposer un par un.",
            "Idéal pour cinquante fichiers d'un coup : nettoyer, consolider, produire un rapport.",
            "Sur un poste professionnel : seulement avec l'accord de l'informatique, et jamais de données confidentielles sur un compte personnel."
          ],
          prompt: "J'ai un dossier de 40 fichiers Excel, un par pays, aux formats légèrement différents. Comment les consolider proprement ? Pose-moi d'abord tes questions."
        }
      ]
    },

    {
      id: "projets",
      titre: "Les projets au long cours",
      resume: "Des mois de travail, sans tout réexpliquer.",
      embleme: "dossier",
      idee: "Un dossier qui dure se mène dans un [[projet|Projet]] : un espace qui garde vos documents, vos consignes et vos conversations.",
      savoirPlus: "Explique-moi la différence entre une conversation, un Projet et ta mémoire, et comment les combiner pour suivre un dossier pendant plusieurs mois.",
      points: [
        {
          titre: "Un Projet par dossier",
          idee: "Ce que vous mettez dans un Projet, Claude le retrouve dans chaque conversation de ce Projet.",
          details: [
            "Déposez les documents de référence : notes de méthode, rapports précédents, glossaire maison.",
            "Rédigez des [[instructions|instructions de projet]] : votre rôle, vos conventions, le ton et le format attendus.",
            "Chaque nouvelle conversation du Projet démarre avec tout ce contexte : plus besoin de le réexpliquer."
          ],
          prompt: "Aide-moi à rédiger les instructions d'un Projet Claude pour [votre dossier] : contexte, conventions, format des réponses. Pose-moi des questions d'abord."
        },
        {
          titre: "Tenez un journal de bord",
          idee: "Un point d'étape écrit vaut mieux qu'une conversation sans fin.",
          details: [
            "En fin de séance, demandez un point : décisions prises, questions ouvertes, prochaine étape.",
            "Ajoutez ce point aux documents du Projet : il devient la mémoire officielle du dossier.",
            "Un sujet, une conversation : les très longues conversations consomment davantage votre [[quota]]."
          ],
          prompt: "Rédige le point d'étape de notre séance : décisions prises, hypothèses retenues, questions ouvertes, prochaines actions. Court et daté."
        },
        {
          titre: "Faites-le travailler sans vous",
          idee: "Claude peut accomplir une tâche à intervalle régulier et se souvenir de vos préférences.",
          details: [
            "Une [[tache|tâche planifiée]] s'exécute seule, chaque jour ou chaque semaine, même ordinateur en veille.",
            "Exemple : chaque lundi, une synthèse des publications de la semaine sur votre sujet, avec les liens.",
            "Sa [[memoire|mémoire]] retient vos préférences d'une conversation à l'autre : dites-lui simplement quoi retenir."
          ],
          prompt: "Chaque lundi à 8 h, fais-moi une synthèse d'une page des publications de la semaine de la BCE, de la Fed et du FMI sur l'inflation, avec les liens."
        }
      ]
    },

    {
      id: "competences",
      titre: "Les compétences",
      resume: "Apprenez-lui votre méthode une fois pour toutes.",
      embleme: "methode",
      idee: "Une [[competence|compétence]] (en anglais, skill) est une méthode que vous expliquez une fois à Claude et qu'il réapplique de lui-même.",
      savoirPlus: "Explique-moi ce qu'est une compétence (skill) dans Claude, avec trois exemples concrets pour un économiste, et comment en créer une sans savoir programmer.",
      points: [
        {
          titre: "À quoi ça sert",
          idee: "Pour tout ce que vous refaites souvent, et toujours de la même façon.",
          details: [
            "Une note de conjoncture selon votre plan, le contrôle qualité d'une série, des graphiques aux couleurs de la maison.",
            "Claude reconnaît seul quand l'utiliser, grâce à la description de la compétence.",
            "Elle fonctionne aussi dans Claude pour Excel, Word et PowerPoint."
          ],
          prompt: "Je fais souvent [vos tâches répétitives]. Lesquelles mériteraient une compétence Claude ? Classe-les de la plus utile à la moins utile."
        },
        {
          titre: "Créez-la en discutant",
          idee: "Pas besoin de programmer : vous décrivez la tâche, Claude rédige la compétence.",
          details: [
            "Dites « Aide-moi à créer une compétence pour… » et décrivez la tâche comme à un stagiaire.",
            "Joignez un exemple réussi, une bonne note ou un bon tableau : c'est ce qu'il imitera.",
            "Claude prépare le fichier de la compétence ; ajoutez-le dans Personnaliser > Compétences."
          ],
          prompt: "Aide-moi à créer une compétence Claude qui rédige une note de conjoncture selon mon modèle. Pose-moi toutes les questions nécessaires, puis prépare le fichier à importer."
        },
        {
          titre: "Affinez-la, partagez-la",
          idee: "Une bonne compétence se construit en quelques essais.",
          details: [
            "Une compétence, une tâche précise. Testez, puis corrigez : « Tu as fait ceci, je voulais cela. »",
            "N'y inscrivez jamais de chiffres ou d'informations confidentiels.",
            "Pour un collègue, envoyez-lui le fichier. Pour une équipe, regroupez plusieurs compétences dans un [[plugin]]."
          ],
          prompt: "Voici ma compétence : [collez son texte]. Relis-la comme un expert : qu'est-ce qui est ambigu, qu'est-ce qui manque, comment la rendre plus fiable ?"
        }
      ]
    },

    {
      id: "pages-web",
      titre: "Pages web et outils",
      resume: "Des simulateurs et des tableaux de bord, sans coder.",
      embleme: "page",
      idee: "Claude ne fait pas que répondre : il fabrique de petits outils interactifs qui s'ouvrent dans votre navigateur.",
      savoirPlus: "Montre-moi, avec trois exemples adaptés à un économiste, quelles pages web interactives tu peux fabriquer et comment je peux m'en servir.",
      points: [
        {
          titre: "Ce qu'il sait fabriquer",
          idee: "Une page web ([[html|HTML]]) peut devenir un simulateur, un tableau de bord ou une explication animée.",
          details: [
            "Un simulateur à curseurs : règle de Taylor, scénario de stress, sensibilité d'un portefeuille.",
            "Un tableau de bord tiré d'un fichier, ou une page qui explique une notion au grand public.",
            "Le résultat, un [[artefact]], s'affiche à côté de la conversation : demandez les changements en français."
          ],
          prompt: "Crée une page interactive qui explique la règle de Taylor : des curseurs pour l'inflation et l'écart de production, et le taux qui se met à jour sur un graphique."
        },
        {
          titre: "Partagez sans risque",
          idee: "Ce que vous créez reste privé tant que vous ne le partagez pas.",
          details: [
            "Avec un abonnement Pro ou Max, partager crée un lien public : à réserver aux contenus non confidentiels.",
            "Sinon, demandez le fichier .html : il s'ouvre dans n'importe quel navigateur, sans rien installer.",
            "Envoyé par e-mail, il s'ouvre d'un double-clic chez votre collègue."
          ],
          prompt: "Transforme cette page en un seul fichier HTML autonome, que je peux envoyer par e-mail et ouvrir hors ligne."
        },
        {
          titre: "Vos données restent chez vous",
          idee: "Une page peut lire un fichier de votre ordinateur sans jamais l'envoyer nulle part.",
          details: [
            "Demandez une page qui ouvre un fichier choisi sur votre poste : tout se calcule dans votre navigateur.",
            "Exemple : charger votre extraction mensuelle au format [[csv|CSV]] et tracer les graphiques maison.",
            "Claude produit aussi de vrais fichiers Excel, Word et PowerPoint, prêts à l'emploi."
          ],
          prompt: "Crée une page HTML autonome où je choisis un fichier CSV sur mon ordinateur ; elle trace les séries que je sélectionne et calcule leurs variations. Rien ne doit partir sur Internet."
        }
      ]
    },

    {
      id: "logiciels",
      titre: "Vos logiciels",
      resume: "Office, R, SAS : des compléments sur mesure.",
      embleme: "piece",
      idee: "Claude écrit des compléments pour les logiciels que vous utilisez déjà, et peut même travailler à l'intérieur d'Excel, de Word et de PowerPoint.",
      savoirPlus: "Je travaille avec Excel, Word, PowerPoint, R et SAS. Explique-moi concrètement comment tu peux m'aider dans chacun, de l'idée la plus simple à la plus ambitieuse.",
      points: [
        {
          titre: "Claude dans Office",
          idee: "Un panneau Claude s'ouvre dans le logiciel et travaille sur le fichier ouvert.",
          details: [
            "Dans Excel : expliquer un classeur hérité, retrouver l'origine d'une erreur, changer une hypothèse sans casser les formules.",
            "Inclus dans les abonnements payants, pour Excel, Word et PowerPoint ; vos compétences y fonctionnent aussi.",
            "Au bureau, l'installation passe par votre service informatique."
          ],
          prompt: "Comment installer Claude dans Excel, et que dois-je demander à mon service informatique ? Explique-moi pas à pas, simplement."
        },
        {
          titre: "Des macros pour Office",
          idee: "Une tâche répétitive dans Excel ou PowerPoint ? Claude écrit la [[macro]] qui la fait à votre place.",
          details: [
            "Décrivez la routine : « Chaque mois, je colle ces douze graphiques dans la présentation… »",
            "Claude écrit la macro et vous guide pour la coller et la lancer, clic par clic.",
            "Testez toujours sur une copie du fichier, jamais sur l'original."
          ],
          prompt: "Chaque mois, je mets à jour 12 graphiques Excel dans une présentation PowerPoint. Écris une macro qui le fait, et explique-moi où la coller, comme à un débutant."
        },
        {
          titre: "Vos programmes R et SAS",
          idee: "Claude lit, explique, traduit et améliore vos programmes.",
          details: [
            "Transformer un code copié-collé dix fois en fonction R ou en macro SAS réutilisable et documentée.",
            "Expliquer un vieux programme dont l'auteur est parti, ou traduire un programme SAS en R.",
            "Aller jusqu'au petit [[package|package R]] maison : vos fonctions, leur mode d'emploi et des exemples."
          ],
          prompt: "Voici un programme SAS : [collez-le]. Explique ce qu'il fait en français simple, puis traduis-le en R avec des commentaires."
        }
      ]
    }
  ]
};

/* Petit lexique : une ou deux phrases par mot, sans jargon. */
window.LEXIQUE = {
  artefact: { mot: "Artefact", def: "Un document, une page ou un petit outil créé par Claude et affiché à côté de la conversation. Il reste privé tant que vous ne le partagez pas." },
  bureau: { mot: "Application pour ordinateur", def: "Le logiciel Claude pour Windows et Mac. Il peut travailler directement dans les dossiers que vous lui ouvrez." },
  code: { mot: "Exécution de code", def: "La capacité de Claude à faire tourner de vrais programmes, dans un espace isolé, pour calculer, analyser et créer des fichiers." },
  competence: { mot: "Compétence (skill)", def: "Une méthode écrite une fois, que Claude réapplique de lui-même quand la tâche se présente. Elles se trouvent dans Personnaliser > Compétences." },
  connecteur: { mot: "Connecteur", def: "Un branchement qui permet à Claude de lire ou d'agir dans une autre application : messagerie, agenda, stockage en ligne…" },
  contexte: { mot: "Contexte", def: "Tout ce que Claude a sous les yeux dans une conversation : vos messages et vos fichiers. Il ne voit rien d'autre de votre travail." },
  csv: { mot: "CSV", def: "Un tableau enregistré en texte simple, que tous les logiciels savent ouvrir : Excel, R, SAS…" },
  hallucination: { mot: "Hallucination", def: "Quand Claude affirme avec assurance quelque chose de faux. D'où l'importance de vérifier chiffres et sources." },
  html: { mot: "HTML", def: "Le langage des pages web. Un fichier .html s'ouvre dans n'importe quel navigateur, sans rien installer." },
  incognito: { mot: "Mode incognito", def: "Une conversation qui n'apparaît ni dans l'historique ni dans la mémoire, et qui ne sert pas à entraîner Claude. Elle est tout de même conservée 30 jours pour la sécurité. On l'ouvre avec l'icône du fantôme." },
  instructions: { mot: "Instructions de projet", def: "Les consignes permanentes d'un Projet : votre rôle, le ton, le format attendu. Claude les applique dans chaque conversation du Projet." },
  macro: { mot: "Macro (VBA)", def: "Un petit programme qui automatise des actions dans Excel, Word ou PowerPoint." },
  memoire: { mot: "Mémoire", def: "Ce que Claude retient de vous d'une conversation à l'autre. Vous pouvez la consulter, la corriger ou la couper." },
  modele: { mot: "Modèle", def: "La version de Claude qui vous répond. Les plus puissants raisonnent mieux sur les problèmes difficiles, mais consomment davantage votre quota." },
  package: { mot: "Package R", def: "Un ensemble de fonctions R rangées et documentées, que l'on installe en une ligne." },
  plugin: { mot: "Plugin", def: "Un paquet prêt à installer qui regroupe des compétences et des connecteurs pour un métier ou une équipe. Ils se trouvent dans Personnaliser > Plugins." },
  projet: { mot: "Projet", def: "Un espace dédié à un dossier, avec ses documents, ses instructions et ses conversations." },
  prompt: { mot: "Prompt", def: "Le message que vous écrivez à Claude. Plus il est précis et complet, meilleure est la réponse." },
  quota: { mot: "Quota", def: "La quantité de travail permise par votre abonnement. Il se recharge toutes les cinq heures, avec en plus une limite par semaine." },
  recherche: { mot: "Recherche", def: "Un mode où Claude consulte de nombreuses sources sur le web et rend un rapport avec ses références." },
  script: { mot: "Script", def: "Une suite d'instructions (R, SAS, Python…) que l'ordinateur exécute d'un seul coup, et que l'on peut relancer à volonté." },
  tache: { mot: "Tâche planifiée", def: "Une consigne que Claude exécute seul, à la fréquence choisie : chaque jour, chaque semaine…" }
};
