import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales | Under The Flow',
  description: 'Mentions légales du site Under The Flow',
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Mentions légales</h1>

        <div className="space-y-10 text-zinc-300">
          {/* Éditeur */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              1. Éditeur du site
            </h2>
            <p className="leading-relaxed">
              Le site <strong>undertheflow.com</strong> est édité par :
            </p>
            <ul className="mt-3 space-y-1">
              <li><strong>Nom :</strong> Under The Flow</li>
              <li><strong>Statut :</strong> Projet artistique indépendant</li>
              <li><strong>Responsable de publication :</strong> Victor Denay</li>
              <li><strong>Email :</strong> contact@undertheflow.com</li>
            </ul>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              2. Hébergement
            </h2>
            <p className="leading-relaxed">
              Le site est hébergé par :
            </p>
            <ul className="mt-3 space-y-1">
              <li><strong>Vercel Inc.</strong></li>
              <li>440 N Barranca Ave #4133</li>
              <li>Covina, CA 91723, États-Unis</li>
              <li>Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">vercel.com</a></li>
            </ul>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              3. Propriété intellectuelle
            </h2>
            <p className="leading-relaxed">
              L&apos;ensemble des contenus présents sur ce site (textes, images, vidéos, logos,
              musiques, graphismes) sont protégés par le droit d&apos;auteur et appartiennent
              à Under The Flow ou aux artistes partenaires, sauf mention contraire.
            </p>
            <p className="mt-3 leading-relaxed">
              Toute reproduction, représentation, modification ou exploitation non autorisée
              de tout ou partie de ces contenus est interdite et constitue une contrefaçon
              sanctionnée par le Code de la propriété intellectuelle.
            </p>
          </section>

          {/* Données personnelles */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              4. Protection des données personnelles
            </h2>
            <p className="leading-relaxed">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la
              loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification,
              de suppression et d&apos;opposition concernant vos données personnelles.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">
              Données collectées
            </h3>
            <p className="leading-relaxed">
              Les seules données personnelles collectées sur ce site proviennent du
              <strong> formulaire de contact</strong> :
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Nom</li>
              <li>Adresse email</li>
              <li>Message</li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">
              Finalité et conservation
            </h3>
            <p className="leading-relaxed">
              Ces données sont utilisées uniquement pour répondre à vos demandes et ne sont
              pas conservées au-delà du temps nécessaire au traitement de votre message.
              Elles ne sont ni vendues, ni transmises à des tiers.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">
              Exercer vos droits
            </h3>
            <p className="leading-relaxed">
              Pour exercer vos droits ou pour toute question relative à vos données,
              contactez-nous à : <a href="mailto:contact@undertheflow.com" className="text-violet-400 hover:underline">contact@undertheflow.com</a>
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              5. Cookies et analytics
            </h2>
            <p className="leading-relaxed">
              Ce site utilise Google Analytics pour analyser l&apos;audience et améliorer
              l&apos;expérience utilisateur. Ces cookies collectent des informations de manière
              anonyme sur la façon dont les visiteurs utilisent le site.
            </p>
            <p className="mt-3 leading-relaxed">
              Vous pouvez configurer votre navigateur pour refuser les cookies ou être
              alerté lorsqu&apos;un cookie est déposé. Cependant, certaines fonctionnalités du
              site pourraient ne plus fonctionner correctement.
            </p>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              6. Limitation de responsabilité
            </h2>
            <p className="leading-relaxed">
              Under The Flow s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées
              sur ce site. Toutefois, nous ne pouvons garantir l&apos;exhaustivité ou l&apos;absence
              d&apos;erreurs. Les informations sont fournies à titre indicatif et sont susceptibles
              d&apos;être modifiées à tout moment.
            </p>
            <p className="mt-3 leading-relaxed">
              Under The Flow décline toute responsabilité concernant les contenus des sites
              externes accessibles via les liens hypertextes présents sur ce site.
            </p>
          </section>

          {/* Crédits */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              7. Crédits
            </h2>
            <ul className="space-y-1">
              <li><strong>Conception et développement :</strong> Adrien Thevon</li>
              <li><strong>Direction artistique :</strong> Under The Flow</li>
              <li><strong>Photographies :</strong> Under The Flow & artistes partenaires</li>
            </ul>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              8. Droit applicable
            </h2>
            <p className="leading-relaxed">
              Les présentes mentions légales sont régies par le droit français.
              En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </section>

          {/* Date de mise à jour */}
          <section className="pt-6 border-t border-zinc-800">
            <p className="text-sm text-zinc-500">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
