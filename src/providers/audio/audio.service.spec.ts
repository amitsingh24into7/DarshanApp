import { TestBed } from '@angular/core/testing';

import { AudioService } from './audio';
import {Platform} from 'ionic-angular';
import {NativeAudio} from '@ionic-native/native-audio';

describe('AudioService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
        Platform,
        NativeAudio
    ],
  }));

  it('should be created', () => {
    const service: AudioService = TestBed.get(AudioService);
    expect(service).toBeTruthy();
  });

  describe('preload', () => {

    it('should load 1 sound file', () => {
      const service: AudioService = TestBed.get(AudioService);

      service.preload('score', 'assets/audio/MaidHair.mp3');

      expect(service.getSounds().length).toEqual(1);
    });

    it('should load all 9 sound files', () => {
      const service: AudioService = TestBed.get(AudioService);

      service.preload('roll0', 'assets/audio/MaidHair.mp3');
      service.preload('roll1', 'assets/audio/MaidHair.mp3');
      service.preload('roll2', 'assets/audio/MaidHair.mp3');
      service.preload('dice0', 'assets/audio/MaidHair.mp3');
      service.preload('dice1', 'assets/audio/MaidHair.mp3');
      service.preload('score', 'assets/audio/MaidHair.mp3');
      service.preload('score0', 'assets/audio/MaidHair.mp3');
      service.preload('oak5', 'assets/audio/MaidHair.mp3');
      service.preload('gameOver', 'assets/audio/MaidHair.mp3');

      expect(service.getSounds().length).toEqual(9);
    });

  });

  describe('play', () => {

    it('should return true for existing sound ', () => {
      const service: AudioService = TestBed.get(AudioService);

      service.preload('score', 'assets/audio/MaidHair.mp3');

      expect(service.play('score')).toEqual(true);
    });

    it('should return false for non-existent sound', () => {
      const service: AudioService = TestBed.get(AudioService);

      service.preload('score', 'assets/audio/MaidHair.mp3');

      expect(service.play('not a sound key')).toEqual(false);
    });

  });

});
