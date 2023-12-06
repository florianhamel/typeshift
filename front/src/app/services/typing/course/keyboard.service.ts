import { Injectable } from '@angular/core';

export enum Hand {
  Right = 'RIGHT',
  Left = 'LEFT',
  Both = 'BOTH'
}

export enum Finger {
  Auricular = 'AURICULAR',
  Ring = 'RING',
  Middle = 'MIDDLE',
  Index = 'INDEX',
  Thumb = 'THUMB'
}

export interface IFinger {
  name: Finger;
  hand: Hand;
  color: string;
  class: string;
}

export interface IKeyboardKey {
  char: string;
  shiftChar?: string;
  display?: string;
  class?: string;
  finger?: IFinger;
}

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  readonly auricular: string = 'lightpink';
  readonly ring: string = 'gold';
  readonly middle: string = 'lightgreen';
  readonly indexLeft: string = 'cornflowerblue';
  readonly indexRight: string = 'lightblue';
  readonly thumb: string = 'lightsalmon';
  readonly neutralColor: string = 'white';
  readonly errorColor: string = 'lightcoral';

  constructor() {
  }

  buildKeyboard(): IKeyboardKey[][] {
    return [
      this.buildFirstRow(),
      this.buildSecondRow(),
      this.buildThirdRow(),
      this.buildFourthRow(),
      this.buildFifthRow()
    ];
  }

  buildHands(): IFinger[][] {
    return [
      this.buildHand(Hand.Left),
      this.buildHand(Hand.Right)
    ];
  }

  private getAuricular(hand: Hand): IFinger {
    return {
      name: Finger.Auricular,
      hand: hand,
      color: this.auricular,
      class: 'auricular'
    };
  }

  private getRing(hand: Hand): IFinger {
    return {
      name: Finger.Ring,
      hand: hand,
      color: this.ring,
      class: 'ring'
    };
  }

  private getMiddle(hand: Hand): IFinger {
    return {
      name: Finger.Middle,
      hand: hand,
      color: this.middle,
      class: 'middle'
    };
  }

  private getIndex(hand: Hand): IFinger {
    return {
      name: Finger.Index,
      hand: hand,
      color: (hand === Hand.Left) ? this.indexLeft : this.indexRight,
      class: 'index'
    };
  }

  private getThumb(): IFinger {
    return {
      name: Finger.Thumb,
      hand: Hand.Both,
      color: this.thumb,
      class: 'thumb'
    };
  }


  private buildFirstRow(): IKeyboardKey[] {
    return [
      { char: '`', shiftChar: '~', class: 'basic-key', finger: this.getAuricular(Hand.Left) },
      { char: '1', shiftChar: '!', class: 'basic-key', finger: this.getAuricular(Hand.Left) },
      { char: '2', shiftChar: '@', class: 'basic-key', finger: this.getRing(Hand.Left) },
      { char: '3', shiftChar: '#', class: 'basic-key', finger: this.getMiddle(Hand.Left) },
      { char: '4', shiftChar: '$', class: 'basic-key', finger: this.getIndex(Hand.Left) },
      { char: '5', shiftChar: '%', class: 'basic-key', finger: this.getIndex(Hand.Left) },
      { char: '6', shiftChar: '^', class: 'basic-key', finger: this.getIndex(Hand.Right) },
      { char: '7', shiftChar: '&', class: 'basic-key', finger: this.getIndex(Hand.Right) },
      { char: '8', shiftChar: '*', class: 'basic-key', finger: this.getMiddle(Hand.Right) },
      { char: '9', shiftChar: '(', class: 'basic-key', finger: this.getRing(Hand.Left) },
      { char: '0', shiftChar: ')', class: 'basic-key', finger: this.getAuricular(Hand.Left) },
      { char: '-', shiftChar: '_', class: 'basic-key', finger: this.getAuricular(Hand.Left) },
      { char: '=', shiftChar: '+', class: 'basic-key', finger: this.getAuricular(Hand.Left) },
      { char: 'del', display: 'del', class: 'delete-key', finger: this.getAuricular(Hand.Left) }
    ];
  }

  private buildSecondRow(): IKeyboardKey[] {
    return [
      { char: 'tab', display: 'tab', class: 'tab-key', finger: this.getAuricular(Hand.Left) },
      { char: 'q', shiftChar: 'Q', class: 'basic-key', finger: this.getAuricular(Hand.Left) },
      { char: 'w', shiftChar: 'W', class: 'basic-key', finger: this.getRing(Hand.Left) },
      { char: 'e', shiftChar: 'E', class: 'basic-key', finger: this.getMiddle(Hand.Left) },
      { char: 'r', shiftChar: 'R', class: 'basic-key', finger: this.getIndex(Hand.Left) },
      { char: 't', shiftChar: 'T', class: 'basic-key', finger: this.getIndex(Hand.Left) },
      { char: 'y', shiftChar: 'Y', class: 'basic-key', finger: this.getIndex(Hand.Right) },
      { char: 'u', shiftChar: 'U', class: 'basic-key', finger: this.getIndex(Hand.Right) },
      { char: 'i', shiftChar: 'I', class: 'basic-key', finger: this.getMiddle(Hand.Right) },
      { char: 'o', shiftChar: 'O', class: 'basic-key', finger: this.getRing(Hand.Right) },
      { char: 'p', shiftChar: 'P', class: 'basic-key', finger: this.getAuricular(Hand.Right) },
      { char: '[', shiftChar: '{', class: 'basic-key', finger: this.getAuricular(Hand.Right) },
      { char: ']', shiftChar: '}', class: 'basic-key', finger: this.getAuricular(Hand.Right) },
      { char: '\\', shiftChar: '|', class: 'basic-key', finger: this.getAuricular(Hand.Right) }
    ];
  }

  private buildThirdRow(): IKeyboardKey[] {
    return [
      { char: 'caps lock', display: 'caps', class: 'caps-key', finger: this.getAuricular(Hand.Left) },
      { char: 'a', shiftChar: 'A', class: 'basic-key', finger: this.getAuricular(Hand.Left) },
      { char: 's', shiftChar: 'S', class: 'basic-key', finger: this.getRing(Hand.Left) },
      { char: 'd', shiftChar: 'D', class: 'basic-key', finger: this.getMiddle(Hand.Left) },
      { char: 'f', shiftChar: 'F', class: 'basic-key mark-key', finger: this.getIndex(Hand.Left) },
      { char: 'g', shiftChar: 'G', class: 'basic-key', finger: this.getIndex(Hand.Left) },
      { char: 'h', shiftChar: 'H', class: 'basic-key', finger: this.getIndex(Hand.Right) },
      { char: 'j', shiftChar: 'J', class: 'basic-key mark-key', finger: this.getIndex(Hand.Right) },
      { char: 'k', shiftChar: 'K', class: 'basic-key', finger: this.getMiddle(Hand.Right) },
      { char: 'l', shiftChar: 'L', class: 'basic-key', finger: this.getRing(Hand.Right) },
      { char: ';', shiftChar: ':', class: 'basic-key', finger: this.getAuricular(Hand.Right) },
      { char: '\'', shiftChar: '"', class: 'basic-key', finger: this.getAuricular(Hand.Right) },
      { char: '\n', display: 'return', class: 'return-key', finger: this.getAuricular(Hand.Right) }
    ];
  }

  private buildFourthRow(): IKeyboardKey[] {
    return [
      { char: 'shift1', display: 'shift', class: 'shift-key', finger: this.getAuricular(Hand.Left) },
      { char: 'z', shiftChar: 'Z', class: 'basic-key', finger: this.getAuricular(Hand.Left) },
      { char: 'x', shiftChar: 'X', class: 'basic-key', finger: this.getRing(Hand.Left) },
      { char: 'c', shiftChar: 'C', class: 'basic-key', finger: this.getMiddle(Hand.Left) },
      { char: 'v', shiftChar: 'V', class: 'basic-key', finger: this.getIndex(Hand.Left) },
      { char: 'b', shiftChar: 'B', class: 'basic-key', finger: this.getIndex(Hand.Left) },
      { char: 'n', shiftChar: 'N', class: 'basic-key', finger: this.getIndex(Hand.Right) },
      { char: 'm', shiftChar: 'M', class: 'basic-key', finger: this.getIndex(Hand.Right) },
      { char: ',', shiftChar: '<', class: 'basic-key', finger: this.getMiddle(Hand.Right) },
      { char: '.', shiftChar: '>', class: 'basic-key', finger: this.getRing(Hand.Right) },
      { char: '/', shiftChar: '?', class: 'basic-key', finger: this.getAuricular(Hand.Right) },
      { char: 'shift2', display: 'shift', class: 'shift-key', finger: this.getAuricular(Hand.Right) }
    ];
  }

  private buildFifthRow(): IKeyboardKey[] {
    return [
      { char: 'fn1', display: '', class: 'basic-key' },
      { char: 'ctrl1', display: '', class: 'basic-key' },
      { char: 'opt1', display: '', class: 'basic-key' },
      { char: 'cmd1', display: '', class: 'command-key' },
      { char: ' ', class: 'space-key', finger: this.getThumb() },
      { char: 'cmd2', display: '', class: 'command-key' },
      { char: 'opt2', display: '', class: 'basic-key' },
      { char: 'arr1', display: '', class: 'basic-key' },
      { char: 'arr2', display: '', class: 'basic-key' },
      { char: 'arr3', display: '', class: 'basic-key' }
    ];
  }

  private buildHand(hand: Hand): IFinger[] {
    const fingers: IFinger[] = [
      this.getAuricular(hand),
      this.getRing(hand),
      this.getMiddle(hand),
      this.getIndex(hand),
      this.getThumb()
    ];
    return (hand === Hand.Left) ? fingers : fingers.reverse();
  }
}
