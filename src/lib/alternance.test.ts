import { describe, it, expect } from 'vitest'
import { addDays, relanceDates, parseCsv, toCsv, gmailComposeUrl, fillTemplate, salutation } from './alternance'

describe('relances', () => {
  it('addDays ajoute le bon nombre de jours', () => {
    expect(addDays('2026-06-01', 7)).toBe('2026-06-08')
    expect(addDays('2026-06-01', 20)).toBe('2026-06-21')
  })
  it('relanceDates calcule J+7 et J+20', () => {
    expect(relanceDates('2026-06-01')).toEqual({ r1: '2026-06-08', r2: '2026-06-21' })
    expect(relanceDates(null)).toEqual({ r1: null, r2: null })
  })
})

describe('csv', () => {
  it('parse un CSV en point-virgule avec BOM', () => {
    const rows = parseCsv('﻿a;b;c\n1;2;3')
    expect(rows).toEqual([['a', 'b', 'c'], ['1', '2', '3']])
  })
  it('parse les champs entre guillemets contenant des virgules', () => {
    const rows = parseCsv('nom,note\n"Dupont, J.","ok"')
    expect(rows[1]).toEqual(['Dupont, J.', 'ok'])
  })
  it('toCsv échappe les valeurs avec virgule', () => {
    expect(toCsv(['a', 'b'], [['x,y', 'z']])).toBe('a,b\n"x,y",z')
  })
})

describe('emails', () => {
  it('gmailComposeUrl encode les paramètres', () => {
    const url = gmailComposeUrl('a@b.fr', 'Sujet', 'Corps')
    expect(url).toContain('to=a%40b.fr')
    expect(url).toContain('su=Sujet')
  })
  it('salutation personnalise selon le contact', () => {
    expect(salutation({ civilite: 'Madame', nom: 'Protano' })).toBe('Madame Protano,')
    expect(salutation(null)).toBe('Madame, Monsieur,')
  })
  it('fillTemplate remplace la salutation', () => {
    const { body } = fillTemplate('candidature', {
      id: '1', civilite: 'Monsieur', nom: 'Lepage', prio: false, statut: 'À envoyer',
      prenom: null, poste: null, entreprise: null, ville: null, secteur: null,
      email: null, tel: null, linkedin: null, date_envoi: null, notes: null,
      source_cat: 'Autre', created_at: '', updated_at: '',
    })
    expect(body.startsWith('Monsieur Lepage,')).toBe(true)
  })
})
