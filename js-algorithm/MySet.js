// 集合
class MySet {
  constructor () {
    this.items = {}
  }

  has (val) {
    return this.items.hasOwnProperty(val)
  }

  add (value) {
    if (!this.has(value)) {
        this.items[value] = value
        return true
    }
    return false
  }

  remove (val) {
    if (this.has(val)) {
      delete this.items[val]
      return true
    }
    return false
  }

  get size () {
    return Object.keys(this.items).length
  }

  get values() {
    return Object.keys(this.items)
  }

  union (otherSet) { // 两个集合并集
    let combineSet = new MySet()
    this.values.forEach(val => combineSet.add(val))
    otherSet.values.forEach(val => {
      if (!combineSet.has(val)) {
        combineSet.add(val)
      }
    })
    return combineSet
  }

  intersection (otherSet) { // 并集
    let newSet = new MySet()
    this.values.forEach(val => {
      if (otherSet.has(val)) {
        newSet.add(val)
      }
    })
    return newSet
  }

  difference (otherSet) { // 差集
    let newSet = new MySet()
    this.values.forEach(val => {
      if (!otherSet.has(val)) {
        newSet.add(val)
      }
    })
    return newSet
  }

  subset (otherSet) { // 子集
    if (this.size > otherSet.size) {
      return false
    } else {
      return this.values.every(val => otherSet.has(val))
    }
  }

}

let myset = new MySet()
let newSet = new MySet()
myset.add('aaa')
myset.add('bbb')
myset.add('bbb')
myset.add('ccc')

newSet.add('aaa')
newSet.add('ccc')
newSet.add('ddd')
// console.log(myset.union(newSet).values)
// console.log(myset.values)

console.log(myset.intersection(newSet).values)
