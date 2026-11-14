import { expect, it } from 'vitest'
import { recruitmentPage, recruitmentPages } from '@/lib/enquiry-recruitment'
import { enquiryServiceFromHash, recruitmentPageFromHash, serviceEnquiryHref } from '@/lib/service-enquiry'

it('round-trips each bounded corporate brief without changing its source when contact language changes', () => {
  for (const page of Object.keys(recruitmentPages)) {
    const href = serviceEnquiryHref('executive-search', 'de', page)
    const hash = href.slice(href.indexOf('#'))
    expect(enquiryServiceFromHash(hash)).toBe('executive-search')
    expect(recruitmentPageFromHash(hash)).toBe(page)
    expect(serviceEnquiryHref('executive-search', 'en', recruitmentPageFromHash(hash))).toBe(href.replace('/de/contact', '/contact'))
  }
})

it('keeps legacy service choices valid without inventing a recruitment origin', () => {
  expect(serviceEnquiryHref('executive-search', 'en')).toBe('/contact#service-executive-search')
  expect(enquiryServiceFromHash('#service-executive-search')).toBe('executive-search')
  expect(recruitmentPageFromHash('#service-executive-search')).toBeUndefined()
})

it('rejects arbitrary paths, private parameters, inherited keys, duplicate and unrelated fragment fields', () => {
  for (const value of ['__proto__', '/contact', '/de/hire-in-house-counsel?email=private@example.com', 'https://www.bsolution.eu/hire-in-house-counsel', {}, null]) expect(recruitmentPage(value)).toBeUndefined()
  for (const hash of ['#service-executive-search&recruitment=__proto__', '#service-executive-search&recruitment=%2Fhire-in-house-counsel&recruitment=%2Fhire-legal-leader', '#service-executive-search&email=private@example.com', '#service-executive-search&recruitment=%2Fhire-in-house-counsel%3Fsecret%3Dprivate', '#service-missing&recruitment=%2Fhire-in-house-counsel']) {
    expect(enquiryServiceFromHash(hash)).toBeUndefined()
    expect(recruitmentPageFromHash(hash)).toBeUndefined()
  }
})
