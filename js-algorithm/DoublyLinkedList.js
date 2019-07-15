// 双向链表

class Node {
  constructor (data) {
    this.data = data
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList {
  constructor () {
    this.head = null
    this.tail = null
    this.length = 0
  }

                    // [prev, data, next]

  // head =>  [prev, data, next]  <= tail

  append (data) {
    let newNode = new Node(data)
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.prev = this.tail
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length += 1
  }

  insert (position, data) {
    if (position < 0 || position > this.length) return false
    let newNode = new Node(data)
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      if (position === 0) {
        this.head.prev = newNode
        newNode.next = this.head
        this.head = newNode
      } else if (position === this.length) {
        newNode.prev = this.tail
        this.tail.next = newNode
        this.tail = newNode
      } else {
        let index = 0
        let current = this.head
        while (index++ < position) {
          current = current.next
        }
        newNode.next = current
        newNode.prev = current.prev
        current.prev.next = newNode
        current.prev = newNode
      }
    }
    this.length += 1
    return true
  }

  get (position) {
    if (position < 0 || position >= this.length) return null
    if (this.length / 2 >= position) {
      let current = this.tail
      let index = this.length - 1
      while (index-- > position) {
        current = current.prev
      }
      return current.data
    } else {
      let current = this.head
      let index = 0
      while (index++ < position) {
        current = current.next
      }
      return current.data
    }
  }

  indexOf (data) {
    let current = this.head
    let index = 0
    while (current) {
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
    let current = null
    if (this.length / 2 >= position) {
      current = this.tail
      let index = this.length - 1
      while (index-- > position) {
        current = current.prev
      }
    } else {
      current = this.head
      let index = 0
      while (index++ < position) {
        current = current.next
      }
    }
    current.data = newData
  }

  removeAt (position) {
    if (position < 0 || position >= this.length) return null
    let current = this.head
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      if (position === 0) { // 删除第一个节点
        this.head.next.prev = null
        this.head = this.head.next
      } else if (position === this.length - 1) { // 删除最后一个节点
        current = this.tail
        this.tail.prev.next = null
        this.tail = this.tail.prev
      } else { // 删除中间节点
        let index = 0
        while (index++ < position) {
          current = current.next
        }
        current.prev.next = current.next
        current.next.prev = current.prev
        current.prev = null
        current.next = null
      }
    }
    this.length -= 1
    return true
  }


  forwardString () {
    let current = this.tail
    let str = ''
    while (current) {
      str += current.data + ' '
      current = current.prev
    }
    return str
  }

  backwradString () {
    let current = this.head
    let str = ''
    while (current) {
      str += current.data + ' '
      current = current.next
    }
    return str
  }

  toString () {
    return this.backwradString()
  }

}

let list = new DoublyLinkedList()
list.append('abc')
list.append('nba')
console.log(list)
console.log(list.removeAt(0))

// list.append('abc')
// list.append('cba')
// list.append('nba')

// list.insert(0, 'aaa')
// // // console.log('11', list.backwradString())
// list.insert(4, 'bbbb')
// // console.log('22', list.backwradString())
// list.insert(2, 'cccc')
// console.log(list.backwradString())

// list.update(list.indexOf('bbbb'), '改过来的')
// console.log(list.backwradString())
// console.log(list.get(6))
// console.log(list)
// console.log('indexOf', list.indexOf('cba'))

