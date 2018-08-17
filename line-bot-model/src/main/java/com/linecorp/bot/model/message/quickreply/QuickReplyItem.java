/*
 * Copyright 2016 LINE Corporation
 *
 * LINE Corporation licenses this file to you under the Apache License,
 * version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

package com.linecorp.bot.model.message.quickreply;

import java.net.URI;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.linecorp.bot.model.action.Action;

import lombok.Builder;
import lombok.Value;

/**
 * @see <a href="https://developers.line.me/en/reference/messaging-api/#quick-reply-button-object">//developers.line.me/en/reference/messaging-api/#quick-reply-button-object</a>
 */
@Value
@Builder
public class QuickReplyItem {
    @JsonProperty("type")
    public String getType() {
        return "action";
    }

    /**
     * @see <a href="https://developers.line.me/en/docs/messaging-api/using-quick-reply/">//developers.line.me/en/docs/messaging-api/using-quick-reply/</a>
     */
    URI imageUrl;

    /**
     * Action which is triggered when the quick reply button is tapped.
     */
    Action action;
}
