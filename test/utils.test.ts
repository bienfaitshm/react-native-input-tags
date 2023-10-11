import {
  addTag,
  canAddTag,
  getLastTag,
  isMatchTags,
  generateId,
  removeTag,
} from '../src/utils';

describe('getLastTag', () => {
  // Arrange
  const tags = ['tag1', 'tag2', 'tag3'];

  it('should return the last tag when the input array has multiple elements', () => {
    // Act
    const result = getLastTag(tags);

    // Assert
    expect(result).toBe('tag3');
  });

  it('should return the last tag when the input array has only one element', () => {
    // Arrange
    const singleTag = ['tag'];

    // Act
    const result = getLastTag(singleTag);

    // Assert
    expect(result).toBe('tag');
  });

  it('should return undefined when the input array is empty', () => {
    // Arrange
    const emptyTags: string[] = [];

    // Act
    const result = getLastTag(emptyTags);

    // Assert
    expect(result).toBeUndefined();
  });

  it('should return the last tag when the input array contains different types of elements', () => {
    // Arrange
    const mixedTags = ['tag1', 2, true, { name: 'tag4' }];

    // Act
    const result = getLastTag(mixedTags);

    // Assert
    expect(result).toEqual({ name: 'tag4' });
  });
});

describe('addTag', () => {
  // Arrange
  const initialTags = ['tag1', 'tag2'];

  it('should add a tag to the array when the input array is not empty', () => {
    // Arrange
    const newTag = 'tag3';

    // Act
    const result = addTag(initialTags, newTag);

    // Assert
    expect(result).toEqual(['tag1', 'tag2', 'tag3']);
  });

  it('should add a tag to an empty array', () => {
    // Arrange
    const emptyTags: string[] = [];
    const newTag = 'tag1';

    // Act
    const result = addTag(emptyTags, newTag);

    // Assert
    expect(result).toEqual(['tag1']);
  });

  it('should add a tag of a different type to the array', () => {
    // Arrange
    const numberTags = [1, 2, 3];
    const newTag = 4;

    // Act
    const result = addTag(numberTags, newTag);

    // Assert
    expect(result).toEqual([1, 2, 3, 4]);
  });
});

describe('removeTag', () => {
  // Arrange
  const tags = [
    { id: 1, name: 'tag1' },
    { id: 2, name: 'tag2' },
    { id: 3, name: 'tag3' },
  ];

  it('should remove the tag with matching id from the array', () => {
    // Arrange
    const tagToRemove = { id: 2, name: 'tag2' };

    // Act
    const result = removeTag(tags, tagToRemove);

    // Assert
    expect(result).toEqual([
      { id: 1, name: 'tag1' },
      { id: 3, name: 'tag3' },
    ]);
  });

  it('should not modify the array when the tag to remove is not found', () => {
    // Arrange
    const tagToRemove = { id: 4, name: 'tag4' };

    // Act
    const result = removeTag(tags, tagToRemove);

    // Assert
    expect(result).toEqual(tags);
  });

  it('should remove the tag when the array contains only one element', () => {
    // Arrange
    const singleTag = [{ id: 1, name: 'tag1' }];
    const tagToRemove = { id: 1, name: 'tag1' };

    // Act
    const result = removeTag(singleTag, tagToRemove);

    // Assert
    expect(result).toEqual([]);
  });

  it('should remove the tag when the array is empty', () => {
    // Arrange
    const emptyTags: { id: number | string }[] = [];
    const tagToRemove = { id: 1, name: 'tag1' };

    // Act
    const result = removeTag(emptyTags, tagToRemove);

    // Assert
    expect(result).toEqual([]);
  });
});

describe('generateId', () => {
  it('should generate a random string id of length 3', () => {
    // Act
    const result = generateId();

    // Assert
    expect(result).toHaveLength(3);
    expect(typeof result).toBe('string');
  });

  it('should generate different ids on multiple invocations', () => {
    // Act
    const id1 = generateId();
    const id2 = generateId();

    // Assert
    expect(id1).not.toBe(id2);
  });
});

describe('isMatchTags', () => {
  it('should return true when the last character of the text is included in the tagOnString array', () => {
    // Arrange
    const text = 'hello';
    const tagOnString = ['o', 'l'];

    // Act
    const result = isMatchTags(text, tagOnString);

    // Assert
    expect(result).toBe(true);
  });

  it('should return false when the last character of the text is not included in the tagOnString array', () => {
    // Arrange
    const text = 'hello';
    const tagOnString = ['a', 'b', 'c'];

    // Act
    const result = isMatchTags(text, tagOnString);

    // Assert
    expect(result).toBe(false);
  });

  it('should return false when the text matches the tagOnString pattern', () => {
    // Arrange
    const text = 'abc';
    const tagOnString = ['a', 'b', 'c'];

    // Act
    const result = isMatchTags(text, tagOnString);

    // Assert
    expect(result).toBe(false);
  });

  it('should return true when the text does not match the tagOnString pattern', () => {
    // Arrange
    const text = 'abc';
    const tagOnString = ['a', 'b'];

    // Act
    const result = isMatchTags(text, tagOnString);

    // Assert
    expect(result).toBe(true);
  });

  it('should return false when the tagOnString array is empty', () => {
    // Arrange
    const text = 'hello';

    // Act
    const result = isMatchTags(text);

    // Assert
    expect(result).toBe(false);
  });
});

describe('canAddTag', () => {
  it('should return true when the text length is greater than 1 and matches the createTagOnString pattern', () => {
    // Arrange
    const text = 'hello';
    const createTagOnString = ['o', 'l'];

    // Act
    const result = canAddTag(text, createTagOnString);

    // Assert
    expect(result).toBe(true);
  });

  it('should return false when the text length is less than or equal to 1', () => {
    // Arrange
    const text = 'a';
    const createTagOnString = ['a', 'b', 'c'];

    // Act
    const result = canAddTag(text, createTagOnString);

    // Assert
    expect(result).toBe(false);
  });

  it('should return false when the text does not match the createTagOnString pattern', () => {
    // Arrange
    const text = 'hello';
    const createTagOnString = ['a', 'b', 'c'];

    // Act
    const result = canAddTag(text, createTagOnString);

    // Assert
    expect(result).toBe(false);
  });

  it('should return false when the createTagOnString array is empty', () => {
    // Arrange
    const text = 'hello';

    // Act
    const result = canAddTag(text);

    // Assert
    expect(result).toBe(false);
  });
});
