import { emitter } from '@/helpers/emitter';

export const utils = {
  prepareToastAndShowIt(message, color='bg-red-500') {
    const toast = {};
    toast.message = message;
    toast.color = color;
    emitter.emit('show-toast', toast);
  }
}