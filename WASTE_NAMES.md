# ごみ名の照合記録

2026年10月25日に、広島市の[令和8年4月版「家庭ごみ分別50音事典」](https://www.city.hiroshima.lg.jp/_res/projects/default_project/_page_/001/003/180/20260450on.pdf)と[令和8年度「家庭ごみの正しい出し方」](https://www.city.hiroshima.lg.jp/living/gomi-kankyo/1021277/1003072/1026095/1026096/1003182.html)を確認した。`label` は事典の品目名を基本とし、ゲーム内で必要な材質・状態・パーツを括弧内などに補う。事典に同一の品目名がない場合は、公式名と断定せず、識別できる一般的な名前を使う。`shortLabel` はコンベア上のみで使用する。

| データの key | 参照した市の品目・扱い | 名称の扱い |
| --- | --- | --- |
| `pet_label_cap_drink`, `pet_drink`, `pet`, `pet_label_cap`, `cap`, `label` | ペットボトル。キャップとラベルは取り外す | 公式品目名に内容物・分解状態・パーツを補記 |
| `soy_sauce_bottle`, `soy_sauce_dirty`, `soy_sauce_dirty_body`, `soy_sauce_label` | しょうゆの容器 | 公式品目名に洗浄・分解状態を補記 |
| `mirin_bottle`, `mirin_dirty`, `mirin_dirty_body`, `mirin_label` | みりんの容器 | 公式品目名に洗浄・分解状態を補記 |
| `cooking_sake_bottle`, `cooking_sake_dirty`, `cooking_sake_dirty_body`, `cooking_sake_label` | 酒の容器、酒類用のペットボトル | 公式品目名に料理酒用・洗浄・分解状態を補記 |
| `condiment_body`, `condiment_cap` | ペットボトル。調味料用のキャップはリサイクルプラ | 複数の調味料で共用するため、公式の一般名に用途・状態を補記 |
| `yogurt_dirty`, `yogurt_clean` | ヨーグルトのカップ | 公式品目名に材質・洗浄状態を補記 |
| `egg_carton_pulp` | 卵のパック | パルプモールド製という材質を補記。事典の一般的な卵パックとは材質が異なるため、名称だけで同じ分別区分とは判断しない |
| `ramune_bottle` | びん（ガラス）、薬・飲料・食料品等用 | 公式の一般名を `label` に使い、画像に合わせた「ラムネびん」を `shortLabel` に使用 |
| `nuigurumi` | ぬいぐるみ（電子機器を内蔵していないもの） | 公式の条件付き品目名を使用 |
| `disposable_heat_pack_packaged`, `disposable_heat_pack_body` | カイロ、使い捨て | 公式品目名に外袋・使用済みの状態を補記 |
| `mercury_thermometer` | 体温計、水銀使用のもの | 公式品目名に水銀使用を補記 |
| `smartphone` | 携帯電話 | 公式品目名にスマートフォンを補記 |
| `mobile_battery` | [モバイルバッテリー](https://www.city.hiroshima.lg.jp/living/gomi-kankyo/1021277/1003072/1026095/1026096/1046707.html) | 2026年10月の市の表記に変更 |
| `ballpoint_pen`, `toothbrush`, `styrofoam`, `rubber_band`, `shoes`, `disposable_chopsticks`, `grass`, `postcard`, `beer_bottle`, `bento_box`, `futon`, `study_desk`, `microwave_oven`, `ironing_board`, `chair`, `carpet`, `aluminum_can`, `notebook`, `kitchen_knife`, `newspaper`, `iron`, `alkaline_battery`, `camera`, `harmonica`, `magnet`, `button_battery` | 50音事典の同名または対応する品目 | 品目名を維持。`camera` だけ電池取り外し状態を補記 |
| `pencil`, `shirt`, `paper_clay` | 50音事典に同じ表記の単独品目を確認できなかったもの | 誤って別の公式名に置き換えず、一般的な名前を維持 |

この記録は名称の根拠を示すもの。分別ルールは別の確認対象である。現在のゲームはモバイルバッテリーとスマートフォンを回収ボックス専用として扱うが、[広島市の案内](https://www.city.hiroshima.lg.jp/living/gomi-kankyo/1021277/1003072/1026095/1026096/1046707.html)ではモバイルバッテリーを有害ごみとしても排出でき、[50音事典](https://www.city.hiroshima.lg.jp/_res/projects/default_project/_page_/001/003/180/20260450on.pdf)では携帯電話を不燃ごみとして掲載している。
