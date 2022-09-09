import getBehavior from '../behavior'
import yuvBehavior from '../yuvBehavior'

const NEAR = 0.001
const FAR = 1000

Component({
  behaviors: [getBehavior({
    threejs: true,
    robotModel: true,
    hitTest2: true,
  }), yuvBehavior],
  methods: {
    init() {
      this.initGL()
    },
    render(frame) {
      this.renderGL(frame)

      const camera = frame.camera

      // 更新动画
      this.updateAnimation()

      // 相机
      if (camera) {
        this.camera.matrixAutoUpdate = false
        this.camera.matrixWorldInverse.fromArray(camera.viewMatrix)
        this.camera.matrixWorld.getInverse(this.camera.matrixWorldInverse)

        const projectionMatrix = camera.getProjectionMatrix(NEAR, FAR)
        this.camera.projectionMatrix.fromArray(projectionMatrix)
        this.camera.projectionMatrixInverse.getInverse(this.camera.projectionMatrix)
      }

      this.renderer.autoClearColor = false
      this.renderer.render(this.scene, this.camera)
      this.renderer.state.setCullFace(this.THREE.CullFaceNone)
    },
  },
})
