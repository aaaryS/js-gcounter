import { expect } from 'chai'
import { List } from 'immutable'
import { GCounter } from './../GCounter'

const listToMerge = List([1,2,3,4,5])

describe('GCounter', () => {
  let gcounter

  beforeEach(() => {
    gcounter = new GCounter(5, 0)
  })

  it('increments correct node', () => {
    gcounter.increment()

    expect(gcounter.getNodes()[0]).to.equal(1)
    expect(gcounter.getNodes()[1]).to.equal(0)
  })

  it('merges with other nodes', () => {
    gcounter.increment()
    gcounter.increment()
    gcounter.increment()
    gcounter.merge(listToMerge)

    expect(gcounter.getNodes()).to.deep.equal([3,2,3,4,5])
  })

  it('returns correct query value', () => {
    gcounter.merge(listToMerge)

    expect(gcounter.query()).to.equal(15)
  })
})
