import { createRef, PureComponent, RefObject } from 'react';
// import './videoPlayer.css';

const DEFAULT_SKIN = 'amp-flush';
const DEFAULT_RATIO = [16, 9];
const DEFAULT_OPTIONS = {
  controls: true,
  autoplay: false,
  muted: true,
  logo: {
    enabled: false,
  },
};

declare const window: any;

export interface IVideoPlayerProps {
  readonly src: { src: string; protectionInfo: any }[];
  readonly options: any;
  readonly skin: string;
  readonly className: string;
  readonly adaptRatio: Array<number>;
}

export default class VideoPlayer extends PureComponent<IVideoPlayerProps> {
  public static defaultProps = {
    skin: DEFAULT_SKIN,
    className: '',
    adaptRatio: DEFAULT_RATIO,
    options: DEFAULT_OPTIONS,
  };

  videoNode: RefObject<any>;
  player: any;
  initialization: any;

  constructor(props: IVideoPlayerProps) {
    super(props);
    this.videoNode = createRef();
  }

  override componentWillUnmount() {
    this._destroyPlayer();
  }

  override componentDidMount() {
    const { skin } = this.props;
    this.initialization = loader(skin).then(() => {
      this._createPlayer();
      this._setVideo();
    });
  }

  override componentDidUpdate(prevProps: IVideoPlayerProps) {
    if (prevProps.src !== this.props.src) {
      this.initialization.then(() => this._setVideo());
    }
  }

  _destroyPlayer() {
    this.player && this.player.dispose();
  }

  _setVideo() {
    if (this.player) {
      const { src } = this.props;
      this.player.src(src);
    }
  }

  _createPlayer() {
    if (window.amp)
      this.player = window.amp(this.videoNode.current, this.props.options);
    // this.player.on('progress', () => alert('on progress called'));
  }

  override render(): JSX.Element {
    return (
      <div>
        <video
          className="azuremediaplayer amp-flush-skin"
          width="640"
          height="400"
          controls
          ref={this.videoNode}
        />
      </div>
    );
  }
}

function loader(skin = 'amp-flush') {
  return new Promise((resolve, _) => {
    if (document.querySelector('#amp-azure')) {
      // video player is already rendered
      return resolve(null);
    }

    const scriptTag = document.createElement('script');
    const linkTag = document.createElement('link');
    linkTag.rel = 'stylesheet';
    scriptTag.id = 'amp-azure';
    scriptTag.src = '//amp.azure.net/libs/amp/latest/azuremediaplayer.min.js';
    linkTag.href = `//amp.azure.net/libs/amp/latest/skins/${skin}/azuremediaplayer.min.css`;
    document.body.appendChild(scriptTag);
    document.head.insertBefore(linkTag, document.head.firstChild);
    scriptTag.onload = () => resolve({ skin: skin });
  });
}
