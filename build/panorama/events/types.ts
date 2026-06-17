export interface PanoramaEvent {
  description: string;
  panelEvent: boolean;
  args: PanoramaEventArgument[];
}

export interface PanoramaEventArgument {
  name?: string;
  type: string;
}
