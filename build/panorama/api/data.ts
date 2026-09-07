import { PanoramaClass } from './types';

export const classExtensions: PanoramaClass[] = [
  {
    name: 'ToastManager',
    namespace: 'ToastManager',
    methods: [
      {
        name: 'QueueToast',
        description:
          'Queues a child Panel for display and lifecycle management as a toast. The Panel must have this ToastManager as its parent.',
        args: [{ name: 'toast', type: 'Panel' }],
        returns: 'void',
      },
      {
        name: 'RemoveToast',
        description: 'Removes a toast Panel previously queued with this ToastManager.',
        args: [{ name: 'toast', type: 'Panel' }],
        returns: 'void',
      },
    ],
  },
];
