import { useTranslation } from 'react-i18next'

const COINS = [
  { nameKey: 'wiki.nr.currency.bronze', value: '1', exchangeKey: 'wiki.nr.currency.baseUnit' },
  { nameKey: 'wiki.nr.currency.silver', value: '100', exchangeKey: 'wiki.nr.currency.eq100bronze' },
  { nameKey: 'wiki.nr.currency.gold', value: '10 000', exchangeKey: 'wiki.nr.currency.eq100silver' },
  { nameKey: 'wiki.nr.currency.netherite', value: '1 000 000', exchangeKey: 'wiki.nr.currency.eq100gold' },
  { nameKey: 'wiki.nr.currency.starCoin', value: '-', exchangeKey: 'wiki.nr.currency.achievement' },
]

export default function Currency() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <p className="text-base-content/80 leading-relaxed">
        {t('wiki.nr.currency.intro')}
      </p>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>{t('wiki.nr.currency.coinCol')}</th>
              <th>{t('wiki.nr.currency.valueCol')}</th>
              <th>{t('wiki.nr.currency.exchangeCol')}</th>
            </tr>
          </thead>
          <tbody>
            {COINS.map(({ nameKey, value, exchangeKey }) => (
              <tr key={nameKey}>
                <td className="font-medium">{t(nameKey)}</td>
                <td>{value}</td>
                <td className="text-base-content/60">{t(exchangeKey)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-base-content/80">{t('wiki.nr.currency.starCoinDesc')}</p>
    </div>
  )
}
