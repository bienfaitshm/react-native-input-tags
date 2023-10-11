/** @format */
/**
 * Retrieves the last tag from an array of tags.
 *
 * @template T - The type of the tags array elements.
 * @param {T[]} tags - The array of tags.
 * @returns {T} - Returns the last tag in the array.
 */
export function getLastTag<T>(tags: T[]): T {
  return tags.slice(-1)[0];
}
/**
 * Adds a tag to an array of tags.
 *
 * @template T - The type of the tags array elements.
 * @param {T[]} tags - The array of tags.
 * @param {T} tag - The tag to add.
 * @returns {T[]} - Returns a new array of tags with the specified tag added.
 */
export function addTag<T>(tags: T[], tag: T): T[] {
  return [...tags, tag];
}

/**
 * Removes a tag from an array of tags.
 *
 * @template T - The type of the tags array elements.
 * @param {T[]} tags - The array of tags.
 * @param {T} tag - The tag to remove.
 * @returns {T[]} - Returns a new array of tags with the specified tag removed.
 */
export function removeTag<T extends { id: number | string }>(
  tags: T[],
  tag: T
): T[] {
  return tags.filter(i => i.id !== tag.id);
}

/**
 * Generates a random alphanumeric ID.
 *
 * @returns {string} - Returns a random alphanumeric ID.
 */
export function generateId(): string {
  return Math.random()
    .toString(36)
    .substring(2, 5);
}

/**
 * Checks if the last character of the given text matches any of the tags provided.
 * Also checks if the entire text consists only of the provided tags.
 *
 * @param {string} text - The text to check.
 * @param {string[]} tagOnString - An optional array of tags to match against.
 * @returns {boolean} - Returns true if the last character of the text matches any of the tags and the entire text consists only of the provided tags, otherwise returns false.
 */
export function isMatchTags(text: string, tagOnString: string[] = []): boolean {
  return (
    tagOnString.includes(text.slice(-1)) &&
    !text.match(new RegExp(`^[${tagOnString.join('')}]+$`, 'g'))
  );
}

/**
 * Checks if a tag can be added to the given text.
 *
 * @param {string} text - The text to check.
 * @param {string[]} createTagOnString - An optional array of tags to match against.
 * @returns {boolean} - Returns true if the text length is greater than 1 and the text matches the provided tags, otherwise returns false.
 */
export function canAddTag(
  text: string,
  createTagOnString: string[] = []
): boolean {
  return text.length > 1 && isMatchTags(text, createTagOnString);
}
