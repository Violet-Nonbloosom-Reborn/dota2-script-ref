export interface PanoramaClass {
  name: string;
  namespace: string;
  methods: PanoramaMethod[];
}

export interface PanoramaMethod {
  name: string;
  description?: string;
  args: PanoramaArg[];
  returns: string;
}

export interface PanoramaArg {
  name: string;
  type: string;
}
