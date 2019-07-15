// 单向链表
class Node {
  constructor (data) {
    this.data = data
    this.next = null
  }
}

class LinkedList {
  constructor () {
    this.head = null
    this.length = 0
  }

  toString () {
    console.log('aaa')
    let current = this.head
    let str = ''
    while (current) {
      str += current.data + ' '
      current = current.next
    }
    return str
  }

  append (data) {
    let newNode = new Node(data)
    if (this.length === 0) {
      this.head = newNode
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = newNode
    }
    this.length += 1
  }

  insert (position, data) {
    let newNode = new Node(data)
    if (position < 0 || position > this.length) return false
    if (position === 0) { // 在链表头部插入
      newNode.next = this.head
      this.head = newNode
    } else {
      let index = 0
      let current = this.head
      let previous = null
      while (index ++ < position) {
        previous = current
        current = current.next
      }
      previous.next = newNode
      newNode.next = current
      this.length += 1
    }
    return true
  }

  get (position) {
    if (position < 0 || position > this.length) return -1
    let index = 0
    let current = this.head
    while(index++ < position) {
      current = current.next
    }
    return current.data
  }

  indexOf (data) {
    let index = 0
    let current = this.head
    while(current) {
      if (current.data === data) {
        return index
      }
      current = current.next
      index += 1
    }
    return -1
  }

  update (position, newData) {
    if (position < 0 || position >= this.length) return false
    let current = this.head
    let index = 0
    while (index++ < position) {
      current = current.next
    }
    current.data = newData
    return true
  }

  removeAt (position) {
    if (position < 0 || position >= this.length) return null
    let current = this.head
    if (position === 0) {
      this.head = this.head.next
    } else {
      let previous = null
      let index = 0
      while (index++ < position) {
        previous = current
        current = current.next
      }
      previous.next = current.next
    }
    this.length -= 1
    return current.data
  }

  remove (el) {
    let position = this.indexOf(el)
    return this.removeAt(position)
  }

  isEmpty () {
    return this.length === 0
  }

  size () {
    return this.length
  }
}

let list = new LinkedList()
list.append('abc')
list.append('cba')
list.append('nba')
// console.log(list)

// list.insert(0, 'py')

// list.insert(1, '我是')
// console.log(list)
// console.log(list.get(0))
// list.update(0, 'newdata')
// console.log(list)
// console.log(list.removeAt(1))
// console.log(list)
// console.log(list.remove('cba'))
console.log(list.toString())