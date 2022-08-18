import { createRef, PureComponent, RefObject } from 'react';
// import './videoPlayer.css';

const DEFAULT_SKIN = 'amp-flush';
const DEFAULT_RATIO = [16, 9];
const DEFAULT_OPTIONS = {
  controls: true,
  autoplay: false,
  // poster: '',
  muted: true,
  logo: {
    enabled: false,
  },
};

declare const window: any;

export interface IVideoPlayerProps {
  readonly src: { src: string; protectionInfo?: any }[];
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
  options = DEFAULT_OPTIONS;

  constructor(props: IVideoPlayerProps) {
    super(props);
    this.options = { ...DEFAULT_OPTIONS, ...props.options };
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
      // showOverlay();
    }
  }

  _createPlayer() {
    if (window.amp)
      this.player = window.amp(this.videoNode.current, this.options);
    // this.player.on('progress', () => alert('on progress called'));
  }

  override render(): JSX.Element {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <video
          className="azuremediaplayer amp-flush-skin"
          style={{ width: '100%', maxHeight: '480px' }}
          // width="1024"
          // height="768"
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

function showOverlay() {
  const el = document.querySelector('.azuremediaplayer');
  document.querySelectorAll('.video-overlay').forEach((e) => e.remove());

  if (el) {
    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    overlay.innerHTML = 'OVERLAY';
    overlay.style.color = 'yellow';
    overlay.style.fontSize = '1rem';
    overlay.style.zIndex = '100000';
    overlay.style.position = 'absolute';
    el.appendChild(overlay);
  }
}
