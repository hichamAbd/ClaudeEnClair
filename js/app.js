/* Claude en clair : navigation, copie des prompts, mots expliqués. Aucun stockage, aucun envoi. */
(function () {
  'use strict';

  var G = window.GUIDE;
  var LEX = window.LEXIQUE;
  var CLAUDE_NOUVEAU = 'https://claude.ai/new';

  var ecran = document.getElementById('ecran');
  var barre = document.querySelector('.barre');
  var retour = document.getElementById('retour');
  var retourTexte = document.getElementById('retour-texte');
  var lienLexique = document.getElementById('lien-lexique');
  var voile = document.querySelector('.voile');
  var feuille = document.getElementById('feuille');
  var feuilleTitre = document.getElementById('feuille-titre');
  var feuilleTexte = document.getElementById('feuille-texte');
  var feuilleLien = document.getElementById('feuille-lien');
  var feuilleFermer = document.getElementById('feuille-fermer');
  var toast = document.getElementById('toast');

  var prompts = new Map();
  var positions = new Map();
  var pile = [];
  var routeAffichee = null;
  var avantLexique = '#/';
  var dernierFocus = null;
  var minuteurToast = null;

  /* ---------- Icônes dessinées pour le guide ---------- */
  var IC = {
    retour: '<path d="M14.5 6l-6 6 6 6"/>',
    suite: '<path d="M9.5 6l6 6-6 6"/>',
    livre: '<path d="M12 6.6C10.3 5.3 7.9 4.7 4 4.9v13.2c3.9-.2 6.3.4 8 1.7 1.7-1.3 4.1-1.9 8-1.7V4.9c-3.9-.2-6.3.4-8 1.7z"/><path d="M12 6.6v13.2"/>',
    copier: '<rect x="8.5" y="8.5" width="11" height="11" rx="2.5"/><path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/>',
    ouvrir: '<path d="M13.5 4.5h6v6"/><path d="M19.5 4.5L11 13"/><path d="M17.5 14v3.5a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2H10"/>',
    bulle: '<path d="M6 5.5h12a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-7.5L6.5 20v-3H6a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2z"/>',
    boussole: '<circle cx="12" cy="12" r="8.5"/><path d="M14.9 9.1l-1.7 4.1-4.1 1.7 1.7-4.1z"/>',
    croiser: '<circle cx="9.5" cy="12" r="5.5"/><circle cx="14.5" cy="12" r="5.5"/>',
    base: '<ellipse cx="12" cy="6.5" rx="7" ry="2.5"/><path d="M5 6.5v11c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-11"/><path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>',
    dossier: '<path d="M3.5 7.5A1.5 1.5 0 0 1 5 6h4.3l1.9 2H19a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5z"/><path d="M8 12.5h8M8 15.5h5"/>',
    methode: '<rect x="5.5" y="5" width="13" height="15.5" rx="2"/><path d="M9.5 5v-.8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V5"/><path d="M8.5 11l1.5 1.5 2.5-2.5M8.5 16l1.5 1.5 2.5-2.5M14.8 11.3h1.4M14.8 16.3h1.4"/>',
    page: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M3.5 8.5h17M7 14h10"/><circle class="plein" cx="10.5" cy="14" r="1.8"/>',
    piece: '<path d="M10 4.5a2 2 0 0 1 4 0V6h3.5a1 1 0 0 1 1 1v3.5H17a2 2 0 0 0 0 4h1.5V18a1 1 0 0 1-1 1H14v-1.5a2 2 0 0 0-4 0V19H6.5a1 1 0 0 1-1-1v-3.5H7a2 2 0 0 0 0-4H5.5V7a1 1 0 0 1 1-1H10z"/>'
  };

  var MARQUE = '<svg class="marque" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
    '<rect width="48" height="48" rx="14" class="marque-fond"/>' +
    '<path class="marque-trait" d="M14 12h20.4a3.6 3.6 0 0 1 3.6 3.6v12a3.6 3.6 0 0 1-3.6 3.6H22.1l-6.9 5.4v-5.4H14a3.6 3.6 0 0 1-3.6-3.6v-12A3.6 3.6 0 0 1 14 12z"/>' +
    '<path class="marque-trait" d="M15.6 18.4h16.8M15.6 22.3h12M15.6 26.2h7.1"/></svg>';

  function svg(nom, taille, classe) {
    taille = taille || 24;
    return '<svg class="ic' + (classe ? ' ' + classe : '') + '" width="' + taille + '" height="' + taille +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      IC[nom] + '</svg>';
  }

  /* ---------- Texte ---------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Typographie française : apostrophes et espaces insécables.
  function fr(s) {
    return String(s)
      .replace(/'/g, '’')
      .replace(/« /g, '« ')
      .replace(/ »/g, ' »')
      .replace(/ ([;!?])/g, ' $1')
      .replace(/ :/g, ' :')
      .replace(/(\d) (Mo|h)\b/g, '$1 $2');
  }

  var MARQUEUR = /\[\[([a-z-]+)(?:\|([^\]]+))?\]\]/g;

  // Texte avec mots expliqués au toucher.
  function riche(s) {
    return fr(esc(s)).replace(MARQUEUR, function (_, cle, texte) {
      var libelle = texte || cle;
      if (!LEX[cle]) return libelle;
      return '<a class="terme" href="#/lexique/' + cle + '" data-terme="' + cle + '" aria-haspopup="dialog">' + libelle + '</a>';
    });
  }

  // Même texte, sans liens (pour l'intérieur d'une carte déjà cliquable).
  function simple(s) {
    return fr(esc(s)).replace(MARQUEUR, function (_, cle, texte) { return texte || cle; });
  }

  function promptHtml(s) {
    return fr(esc(s)).replace(/\[([^\]]+)\]/g, '<span class="trou">[$1]</span>');
  }

  function promptTexte(s) {
    return fr(s).replace(/[  ]/g, ' ');
  }

  /* ---------- Itinéraire ---------- */
  var ordre = ['#/'];
  G.chapitres.forEach(function (c) {
    ordre.push('#/c/' + c.id);
    c.points.forEach(function (_, i) { ordre.push('#/c/' + c.id + '/' + (i + 1)); });
  });
  ordre.push('#/lexique');

  function hashCourant() {
    var h = location.hash;
    return (!h || h === '#' || h === '#/') ? '#/' : h;
  }

  function lireRoute(h) {
    var parties = decodeURIComponent(String(h).replace(/^#\/?/, '')).split('/').filter(Boolean);
    if (parties[0] === 'c' && parties[1]) {
      var ci = -1;
      for (var i = 0; i < G.chapitres.length; i++) { if (G.chapitres[i].id === parties[1]) { ci = i; break; } }
      if (ci < 0) return { type: 'accueil' };
      var n = parseInt(parties[2], 10);
      if (n >= 1 && n <= G.chapitres[ci].points.length) return { type: 'point', ci: ci, pi: n - 1 };
      return { type: 'chapitre', ci: ci };
    }
    if (parties[0] === 'lexique') return { type: 'lexique', cle: LEX[parties[1]] ? parties[1] : null };
    return { type: 'accueil' };
  }

  function canonique(r) {
    if (r.type === 'chapitre') return '#/c/' + G.chapitres[r.ci].id;
    if (r.type === 'point') return '#/c/' + G.chapitres[r.ci].id + '/' + (r.pi + 1);
    if (r.type === 'lexique') return '#/lexique';
    return '#/';
  }

  function profondeur(r) {
    return r.type === 'accueil' ? 0 : (r.type === 'point' ? 2 : 1);
  }

  /* ---------- Morceaux d'écran ---------- */
  function carteEssai(id, texte, savoirPlus) {
    prompts.set(id, promptTexte(texte));
    var titre = savoirPlus ? 'Pour en savoir plus, demandez à Claude' : 'Essayez avec Claude';
    var aide = texte.indexOf('[') >= 0
      ? '<p class="essai-aide">' + fr(esc("Remplacez les passages entre crochets avant d'envoyer.")) + '</p>'
      : '';
    return '<section class="essai">' +
      '<h2 class="essai-titre">' + svg('bulle', 20) + '<span>' + fr(esc(titre)) + '</span></h2>' +
      '<p class="bulle-prompt">' + promptHtml(texte) + '</p>' + aide +
      '<div class="essai-actions">' +
        '<a class="bouton bouton-plein" href="' + CLAUDE_NOUVEAU + '" target="_blank" rel="noopener noreferrer" data-copier="' + id + '" data-ouvrir="1">' +
          svg('ouvrir', 20) + '<span>Copier et ouvrir Claude</span></a>' +
        '<button type="button" class="bouton bouton-discret" data-copier="' + id + '">' + svg('copier', 20) + '<span>Copier</span></button>' +
      '</div></section>';
  }

  function carteSuivant(depuis) {
    var i = ordre.indexOf(depuis);
    if (i < 0 || i >= ordre.length - 1) return '';
    var h = ordre[i + 1];
    var r = lireRoute(h);
    var titre;
    if (r.type === 'chapitre') titre = 'Chapitre ' + (r.ci + 1) + ' : ' + G.chapitres[r.ci].titre;
    else if (r.type === 'point') titre = 'Point ' + (r.pi + 1) + ' : ' + G.chapitres[r.ci].points[r.pi].titre;
    else titre = 'Petit lexique';
    return '<a class="suivant" href="' + h + '"><span class="suivant-corps">' +
      '<span class="suivant-mot">Suivant</span><span class="suivant-titre">' + fr(esc(titre)) + '</span></span>' +
      svg('suite', 22) + '</a>';
  }

  function branche(contenu) {
    return '<li class="branche"><span class="noeud" aria-hidden="true"></span>' + contenu + '</li>';
  }

  function carteLien(href, num, titre, texte) {
    return '<a class="carte" href="' + href + '">' +
      '<span class="num" aria-hidden="true">' + num + '</span>' +
      '<span class="carte-corps"><span class="carte-titre">' + titre + '</span>' +
      '<span class="carte-texte">' + texte + '</span></span>' +
      svg('suite', 20, 'chevron') + '</a>';
  }

  /* ---------- Écrans ---------- */
  function vueAccueil() {
    var chapitres = G.chapitres.map(function (c, i) {
      return branche(carteLien('#/c/' + c.id, i + 1, fr(esc(c.titre)), fr(esc(c.resume))));
    }).join('');
    return '<div class="entete-accueil">' + MARQUE +
        '<h1 class="titre-app" tabindex="-1">' + esc(G.titre) + '</h1>' +
        '<p class="accroche">' + fr(esc(G.accroche)) + '</p>' +
        '<p class="aide">' + riche(G.aide) + '</p>' +
      '</div>' +
      '<p class="galet">' + riche(G.idee) + '</p>' +
      '<ol class="branches" aria-label="Chapitres">' + chapitres + '</ol>' +
      '<a class="carte carte-lexique" href="#/lexique"><span class="num num-lexique" aria-hidden="true">Aa</span>' +
        '<span class="carte-corps"><span class="carte-titre">Petit lexique</span>' +
        '<span class="carte-texte">' + fr(esc('Les mots de Claude, en clair.')) + '</span></span>' +
        svg('suite', 20, 'chevron') + '</a>' +
      '<p class="pied">' + fr(esc(G.pied)) + '</p>';
  }

  function vueChapitre(ci) {
    var c = G.chapitres[ci];
    var points = c.points.map(function (p, i) {
      return branche(carteLien('#/c/' + c.id + '/' + (i + 1), i + 1, fr(esc(p.titre)), simple(p.idee)));
    }).join('');
    return '<p class="repere">Chapitre ' + (ci + 1) + ' sur ' + G.chapitres.length + '</p>' +
      '<div class="titre-chapitre"><span class="embleme">' + svg(c.embleme, 28) + '</span>' +
        '<h1 tabindex="-1">' + fr(esc(c.titre)) + '</h1></div>' +
      '<p class="galet">' + riche(c.idee) + '</p>' +
      '<ol class="branches" aria-label="Les trois points">' + points + '</ol>' +
      carteEssai(c.id + '-plus', c.savoirPlus, true) +
      carteSuivant('#/c/' + c.id);
  }

  function vuePoint(ci, pi) {
    var c = G.chapitres[ci];
    var p = c.points[pi];
    var details = p.details.map(function (d) {
      return '<li class="branche branche-feuille"><span class="noeud" aria-hidden="true"></span><p class="detail">' + riche(d) + '</p></li>';
    }).join('');
    return '<p class="repere">Point ' + (pi + 1) + ' sur ' + c.points.length + '</p>' +
      '<h1 tabindex="-1">' + fr(esc(p.titre)) + '</h1>' +
      '<p class="galet galet-point">' + riche(p.idee) + '</p>' +
      '<ul class="branches" aria-label="En détail">' + details + '</ul>' +
      carteEssai(c.id + '-' + (pi + 1), p.prompt, false) +
      carteSuivant('#/c/' + c.id + '/' + (pi + 1));
  }

  function vueLexique() {
    var cles = Object.keys(LEX).sort(function (a, b) { return LEX[a].mot.localeCompare(LEX[b].mot, 'fr'); });
    var entrees = cles.map(function (k) {
      return '<div class="entree" id="mot-' + k + '"><dt>' + fr(esc(LEX[k].mot)) + '</dt><dd>' + fr(esc(LEX[k].def)) + '</dd></div>';
    }).join('');
    return '<h1 class="titre-lexique" tabindex="-1">Petit lexique</h1>' +
      '<p class="accroche">' + fr(esc('Les mots de Claude, en clair.')) + '</p>' +
      '<dl class="lexique">' + entrees + '</dl>' +
      '<p class="pied">' + fr(esc("Vérifié en novembre 2026 sur le centre d'aide de Claude. Les menus changent vite : si un nom ne correspond plus, cherchez l'équivalent le plus proche.")) +
      ' <a href="https://support.claude.com/fr" target="_blank" rel="noopener noreferrer">' + fr(esc("Centre d'aide de Claude")) + '</a></p>';
  }

  /* ---------- Rendu ---------- */
  function majBarre(r) {
    lienLexique.hidden = r.type === 'lexique';
    if (r.type === 'accueil') { retour.hidden = true; return; }
    var cible = '#/';
    var libelle = 'Accueil';
    if (r.type === 'point') { cible = '#/c/' + G.chapitres[r.ci].id; libelle = G.chapitres[r.ci].titre; }
    if (r.type === 'lexique') { cible = avantLexique; libelle = 'Retour'; }
    retour.setAttribute('href', cible);
    retourTexte.textContent = fr(libelle);
    retour.hidden = false;
  }

  function rendre(premier) {
    var h = hashCourant();
    var r = lireRoute(h);
    var canon = canonique(r);
    var ancienne = routeAffichee ? lireRoute(routeAffichee) : null;

    var sens = 'avant';
    if (!premier && ancienne) {
      if (r.type === 'lexique' && ancienne.type !== 'lexique') sens = 'avant';
      else if (ancienne.type === 'lexique' && r.type !== 'lexique') sens = 'arriere';
      else {
        var a = profondeur(ancienne), b = profondeur(r);
        if (b < a) sens = 'arriere';
        else if (b === a) sens = ordre.indexOf(canon) >= ordre.indexOf(canonique(ancienne)) ? 'avant' : 'arriere';
      }
      positions.set(canonique(ancienne), window.scrollY);
      if (r.type === 'lexique' && ancienne.type !== 'lexique') avantLexique = canonique(ancienne);
    }

    prompts.clear();
    var html;
    var titre = '';
    if (r.type === 'chapitre') { html = vueChapitre(r.ci); titre = G.chapitres[r.ci].titre; }
    else if (r.type === 'point') { html = vuePoint(r.ci, r.pi); titre = G.chapitres[r.ci].points[r.pi].titre; }
    else if (r.type === 'lexique') { html = vueLexique(); titre = 'Petit lexique'; }
    else { html = vueAccueil(); }

    ecran.innerHTML = html;
    document.title = titre ? fr(titre) + ' – ' + G.titre : G.titre;
    majBarre(r);

    ecran.classList.remove('ecran-avant', 'ecran-arriere');
    void ecran.offsetWidth;
    ecran.classList.add(sens === 'avant' ? 'ecran-avant' : 'ecran-arriere');

    var cibleMot = r.type === 'lexique' && r.cle ? document.getElementById('mot-' + r.cle) : null;
    if (cibleMot) {
      window.scrollTo(0, 0);
      requestAnimationFrame(function () {
        var y = cibleMot.getBoundingClientRect().top + window.scrollY - barre.offsetHeight - 16;
        window.scrollTo(0, Math.max(0, y));
        cibleMot.classList.add('cible');
      });
    } else if (sens === 'arriere' && positions.has(canon)) {
      window.scrollTo(0, positions.get(canon));
    } else {
      window.scrollTo(0, 0);
    }

    if (!premier) {
      var t = ecran.querySelector('h1');
      if (t) t.focus({ preventScroll: true });
    }
    routeAffichee = h;
  }

  /* ---------- Copie ---------- */
  function copierTout(texte) {
    var ok = false;
    var zone = document.createElement('span');
    zone.className = 'zone-copie';
    zone.textContent = texte;
    document.body.appendChild(zone);
    var sel = window.getSelection();
    try {
      var plage = document.createRange();
      plage.selectNodeContents(zone);
      sel.removeAllRanges();
      sel.addRange(plage);
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    }
    sel.removeAllRanges();
    zone.remove();
    return ok;
  }

  function copierAsync(texte) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texte).then(function () { return true; }, function () { return false; });
    }
    return Promise.resolve(false);
  }

  var ECHEC = 'Copie impossible. Sélectionnez le texte du prompt et copiez-le.';

  function afficherToast(message, duree) {
    toast.textContent = fr(message);
    toast.classList.add('visible');
    clearTimeout(minuteurToast);
    minuteurToast = setTimeout(function () { toast.classList.remove('visible'); }, duree || 3200);
  }

  function gererCopie(e, el) {
    var texte = prompts.get(el.getAttribute('data-copier')) || '';
    var ouvrir = el.hasAttribute('data-ouvrir');
    var message = ouvrir ? 'Prompt copié. Collez-le dans la nouvelle conversation.' : 'Prompt copié.';
    if (copierTout(texte)) {
      afficherToast(message, ouvrir ? 6000 : 3200);
      return;
    }
    // Repli : presse-papiers moderne. Le lien n'est ouvert qu'une fois la copie faite.
    e.preventDefault();
    copierAsync(texte).then(function (ok) {
      afficherToast(ok ? message : ECHEC, ok && ouvrir ? 6000 : 4500);
      if (ok && ouvrir) window.open(CLAUDE_NOUVEAU, '_blank', 'noopener');
    });
  }

  /* ---------- Mots expliqués (feuille) ---------- */
  function mouvementReduit() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function ouvrirFeuille(cle, source) {
    var entree = LEX[cle];
    if (!entree) return;
    dernierFocus = source || document.activeElement;
    clearTimeout(minuteurToast);
    toast.classList.remove('visible');
    feuilleTitre.textContent = fr(entree.mot);
    feuilleTexte.textContent = fr(entree.def);
    feuilleLien.setAttribute('href', '#/lexique/' + cle);
    voile.hidden = false;
    feuille.hidden = false;
    document.documentElement.classList.add('fige');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        voile.classList.add('ouverte');
        feuille.classList.add('ouverte');
      });
    });
    feuilleFermer.focus({ preventScroll: true });
  }

  function fermerFeuille(sansRetourFocus) {
    if (feuille.hidden) return;
    voile.classList.remove('ouverte');
    feuille.classList.remove('ouverte');
    document.documentElement.classList.remove('fige');
    var cacher = function () { voile.hidden = true; feuille.hidden = true; };
    if (mouvementReduit()) cacher(); else setTimeout(cacher, 280);
    if (!sansRetourFocus && dernierFocus && document.contains(dernierFocus)) {
      dernierFocus.focus({ preventScroll: true });
    }
    dernierFocus = null;
  }

  /* ---------- Événements ---------- */
  document.addEventListener('click', function (e) {
    var copieur = e.target.closest('[data-copier]');
    if (copieur) { gererCopie(e, copieur); return; }

    var terme = e.target.closest('.terme');
    if (terme && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      ouvrirFeuille(terme.getAttribute('data-terme'), terme);
      return;
    }

    if (e.target.closest('#feuille-lien')) { fermerFeuille(true); return; }
    if (e.target.closest('[data-fermer]')) { fermerFeuille(false); return; }

    if (e.target.closest('#retour')) {
      var cible = retour.getAttribute('href');
      if (pile.length > 1 && pile[pile.length - 2] === cible) {
        e.preventDefault();
        history.back();
      }
    }
  });

  document.addEventListener('keydown', function (e) {
    if (feuille.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); fermerFeuille(false); return; }
    if (e.key === 'Tab') {
      var elements = [feuilleLien, feuilleFermer];
      var i = elements.indexOf(document.activeElement);
      e.preventDefault();
      var j = e.shiftKey ? (i <= 0 ? elements.length - 1 : i - 1) : (i + 1) % elements.length;
      elements[j].focus();
    }
  });

  window.addEventListener('hashchange', function () {
    var h = hashCourant();
    if (pile.length > 1 && pile[pile.length - 2] === h) pile.pop();
    else pile.push(h);
    fermerFeuille(true);
    rendre(false);
  });

  var tic = false;
  window.addEventListener('scroll', function () {
    if (tic) return;
    tic = true;
    requestAnimationFrame(function () {
      barre.classList.toggle('defile', window.scrollY > 4);
      tic = false;
    });
  }, { passive: true });

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  pile.push(hashCourant());
  rendre(true);

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
