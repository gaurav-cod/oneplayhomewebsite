const XCountlySUM = 'XCountlySUM';
class CountlyService {
  countly_prefix_key = "x_countly_event_key"
  data_postfix = " - data"

  constructor() {
    // this.initCountly()
  }

  track_pageview = url => Countly.track_pageview(url)

  addEvent(event, segments) {
    let sum = undefined
    if (XCountlySUM in segments) {
      sum = segments[XCountlySUM]
      delete segments[XCountlySUM]
    }
    segments["channel"] = "web"
    segments["partner"] = "partnerId"
    this._addEvent({ key: event, sum, segmentation: segments })
  }

  startEvent(event, { data, discardOldData = false } = {}) {
    localStorage.setItem(this.keyOfKey(event), `${+new Date()}`)
    if (
      discardOldData ||
      (data && !localStorage.getItem(this.keyOfKey(event + this.data_postfix)))
    )
      localStorage.setItem(
        this.keyOfKey(event + this.data_postfix),
        JSON.stringify(data)
      )
    return {
      key: () => this.keyOfKey(event),
      cancel: () => this.cancelEvent(event),
      end: segments => this.endEvent(event, segments),
      update: segments => this.updateEventData(event, segments),
      data: () => this.getEventData(event)
    }
  }

  cancelEvent(event) {
    localStorage.removeItem(this.keyOfKey(event))
    localStorage.removeItem(this.keyOfKey(event + this.data_postfix))
  }

  getEventData(event) {
    return JSON.parse(
      localStorage.getItem(this.keyOfKey(event + this.data_postfix)) ?? "{}"
    )
  }

  updateEventData(event, segments) {
    const prevData = JSON.parse(
      localStorage.getItem(this.keyOfKey(event + this.data_postfix)) ?? "{}"
    )
    localStorage.setItem(
      this.keyOfKey(event + this.data_postfix),
      JSON.stringify({ ...prevData, ...segments })
    )
  }

  endEvent(event, segments = {}) {
    const keyTS = localStorage.getItem(this.keyOfKey(event))
    const ts = new Date(parseInt(keyTS) ?? `${+new Date()}`)
    const data = JSON.parse(
      localStorage.getItem(this.keyOfKey(event + this.data_postfix)) ?? "{}"
    )
    localStorage.removeItem(this.keyOfKey(event + this.data_postfix))
    localStorage.removeItem(this.keyOfKey(event))
    if (!keyTS) return
    let sum = undefined
    if (XCountlySUM in segments) {
      sum = segments[XCountlySUM]
      delete segments[XCountlySUM]
    }
    segments["channel"] = "web"
    segments["partner"] = "partnerId"
    this._addEvent({
      sum,
      key: event,
      dur: (+new Date() - +ts) / 1000,
      segmentation: { ...data, ...segments }
    })
  }

  updateUser(key, value, save = false) {
    Countly.userData.set(key, value)
    if (save) {
      this.saveUser()
    }
  }

  saveUser() {
    Countly.userData.save()
  }

  keyOfKey = k => `${this.countly_prefix_key} - ${k}`

  // _addEvent = data => Countly.add_event(data)
  _addEvent = data => {
    console.warn('ctly add_event:', data, typeof Countly)
    Countly.add_event(data)
  }

  // async initCountly() {
  //   Countly.init({
  //     // debug: false,
  //     debug: !environment.production,
  //     app_key: environment.countly.key,
  //     url: environment.countly.url,
  //     heatmap_whitelist: [environment.domain],
  //     app_version: environment.appVersion
  //   })
  //
  //   Countly.track_sessions()
  //   Countly.track_clicks()
  //   Countly.track_scrolls()
  //   Countly.track_errors()
  //   Countly.track_links()
  //
  //   this.authService.user.subscribe(user => {
  //     if (!user || user.id === Countly.get_device_id()) {
  //       return
  //     }
  //
  //     const idType = Countly.get_device_id_type()
  //
  //     switch (idType) {
  //       case Countly.DeviceIdType.DEVELOPER_SUPPLIED:
  //         Countly.change_id(user.id)
  //         break
  //       case Countly.DeviceIdType.SDK_GENERATED:
  //         Countly.change_id(user.id, true)
  //         break
  //       case Countly.DeviceIdType.TEMPORARY_ID:
  //         Countly.disable_offline_mode(user.id)
  //         break
  //     }
  //
  //     const option = {
  //       name: user.name
  //     }
  //
  //     switch (user.gender) {
  //       case Gender.Male:
  //         option.gender = "M"
  //         break
  //       case Gender.Female:
  //         option.gender = "F"
  //     }
  //
  //     if (user.username) {
  //       option.username = user.username
  //     }
  //
  //     if (user.age) {
  //       option.byear = new Date().getFullYear() - user.age
  //     }
  //
  //     if (user.photo) {
  //       option.picture = user.photo
  //     }
  //
  //     Countly.user_details(option)
  //   })
  //
  //   Countly.q.push([
  //     "track_performance",
  //     {
  //       //page load timing
  //       RT: {},
  //       //required for automated networking traces
  //       instrument_xhr: true,
  //       captureXhrRequestResponse: true,
  //       AutoXHR: {
  //         alwaysSendXhr: true,
  //         monitorFetch: true,
  //         captureXhrRequestResponse: true
  //       },
  //       //required for screen freeze traces
  //       Continuity: {
  //         enabled: true,
  //         monitorLongTasks: true,
  //         monitorPageBusy: true,
  //         monitorFrameRate: true,
  //         monitorInteractions: true,
  //         afterOnload: true
  //       }
  //     }
  //   ])
  // }
}

const countlyService = new CountlyService();

