/**
 * @copyright 2024 Andrew Eddie. All rights reserved.
 * @license   MIT
 */

export type NumberDictionary = {
  [key: string]: number | undefined
}

export type StringDictionary = {
  [key: string]: string | undefined
}

export type ScalarDictionary = NumberDictionary & StringDictionary
