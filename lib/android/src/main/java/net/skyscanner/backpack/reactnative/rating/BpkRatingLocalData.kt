/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.skyscanner.backpack.reactnative.rating

import android.content.Context
import net.skyscanner.backpack.rating.BpkRating

internal class BpkRatingLocalData(
  private val rating: BpkRating,
  private val orientation: BpkRating.Orientation,
  private val size: BpkRating.Size
) {
  fun asBpkRating(context: Context) = BpkRating(context, orientation, size).apply {
    title = rating.title
    subtitle = rating.subtitle
    value = rating.value
  }
}
