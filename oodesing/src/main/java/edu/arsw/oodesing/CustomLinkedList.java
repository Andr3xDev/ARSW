package edu.arsw.oodesing;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.NoSuchElementException;

/**
 * A custom implementation of a singly linked list.
 * This class implements the List interface to be compliant with Java's Collections API.
 *
 * @param <E> the type of elements held in this collection.
 */
public class CustomLinkedList<E> implements List<E> {

    /**
     * A static inner class to represent each node in the list.
     * It holds the data item and a reference to the next node.
     */
    private static class Node<E> {
        public E item;
        public Node<E> next;

        public Node(E element) {
            this.item = element;
            this.next = null;
        }
    }



    private Node<E> head;
    private int size = 0;

    /**
     * Appends the specified element to the end of this list.
     *
     * @param e element to be appended to this list.
     * @return true (as specified by Collection.add).
     */
    @Override
    public boolean add(E e) {
        final Node<E> newNode = new Node<>(e);
        if (head == null) {
            head = newNode;
        } else {
            Node<E> current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        size++;
        return true;
    }

    /**
     * Returns the element at the specified position in this list.
     *
     * @param index index of the element to return.
     * @return the element at the specified position in this list.
     */
    @Override
    public E get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
        }
        Node<E> current = head;
        for (int i = 0; i < index; i++) {
            current = current.next;
        }
        return current.item;
    }

    /**
     * Returns the number of elements in this list.
     *
     * @return the number of elements in this list.
     */
    @Override
    public int size() {
        return this.size;
    }

    /**
     * Returns an iterator over the elements in this list in proper sequence.
     * This allows the list to be used in a for-each loop.
     *
     * @return an iterator over the elements in this list.
     */
    @Override
    public Iterator<E> iterator() {
        return new Iterator<E>() {
            private Node<E> currentNode = head;

            @Override
            public boolean hasNext() {
                return currentNode != null;
            }

            @Override
            public E next() {
                if (!hasNext()) {
                    throw new NoSuchElementException();
                }
                E item = currentNode.item;
                currentNode = currentNode.next;
                return item;
            }
        };
    }

    @Override
    public boolean isEmpty() {
        return this.size == 0;
    }



    // --- All other List methods are unsupported for this specific assignment ---

    @Override
    public boolean contains(Object o) { throw new UnsupportedOperationException(); }
    @Override
    public Object[] toArray() { throw new UnsupportedOperationException(); }
    @Override
    public <T> T[] toArray(T[] a) { throw new UnsupportedOperationException(); }
    @Override
    public boolean remove(Object o) { throw new UnsupportedOperationException(); }
    @Override
    public boolean containsAll(Collection<?> c) { throw new UnsupportedOperationException(); }
    @Override
    public boolean addAll(Collection<? extends E> c) { throw new UnsupportedOperationException(); }
    @Override
    public boolean addAll(int index, Collection<? extends E> c) { throw new UnsupportedOperationException(); }
    @Override
    public boolean removeAll(Collection<?> c) { throw new UnsupportedOperationException(); }
    @Override
    public boolean retainAll(Collection<?> c) { throw new UnsupportedOperationException(); }
    @Override
    public void clear() { throw new UnsupportedOperationException(); }
    @Override
    public E set(int index, E element) { throw new UnsupportedOperationException(); }
    @Override
    public void add(int index, E element) { throw new UnsupportedOperationException(); }
    @Override
    public E remove(int index) { throw new UnsupportedOperationException(); }
    @Override
    public int indexOf(Object o) { throw new UnsupportedOperationException(); }
    @Override
    public int lastIndexOf(Object o) { throw new UnsupportedOperationException(); }
    @Override
    public ListIterator<E> listIterator() { throw new UnsupportedOperationException(); }
    @Override
    public ListIterator<E> listIterator(int index) { throw new UnsupportedOperationException(); }
    @Override
    public List<E> subList(int fromIndex, int toIndex) { throw new UnsupportedOperationException(); }

}
